import { Layout } from '@/components/layout/Layout';
import { customers, systems, subscriptions } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Mail, Phone, Building2, CreditCard, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

const systemColors: Record<string, string> = {
  estoque: 'bg-[hsl(280,65%,60%)]',
  finance: 'bg-[hsl(142,76%,36%)]',
  syntax: 'bg-[hsl(38,92%,50%)]',
};

export default function Customers() {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os clientes e suas assinaturas
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => {
            const customerSubs = subscriptions.filter((s) => s.customerId === customer.id);
            const activeCount = customerSubs.filter((s) => s.status === 'active').length;
            const totalSpend = customerSubs
              .filter((s) => s.status === 'active')
              .reduce((acc, s) => acc + s.price, 0);

            return (
              <div
                key={customer.id}
                className="rounded-xl border border-border bg-card p-6 hover:border-border/80 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.company}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Nova assinatura</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </div>

                {/* Subscriptions */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Assinaturas ativas</span>
                    </div>
                    <span className="font-semibold">{activeCount}</span>
                  </div>

                  {/* System badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {customerSubs
                      .filter((s) => s.status === 'active')
                      .map((sub) => {
                        const system = systems.find((sys) => sys.id === sub.systemId);
                        return (
                          <div
                            key={sub.id}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-xs"
                          >
                            <div className={cn('h-2 w-2 rounded-full', systemColors[sub.systemId])} />
                            <span>{system?.name}</span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Receita mensal</span>
                    <span className="font-semibold text-success">
                      R$ {totalSpend.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
