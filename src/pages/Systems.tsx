import { Layout } from '@/components/layout/Layout';
import { systems, subscriptions, plans } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Settings,
  ExternalLink,
  MoreHorizontal,
  Users,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const systemColorClasses: Record<string, { bg: string; border: string; text: string }> = {
  'system-estoque': {
    bg: 'bg-[hsl(280,65%,60%)]/10',
    border: 'border-[hsl(280,65%,60%)]/30',
    text: 'text-[hsl(280,65%,60%)]',
  },
  'system-finance': {
    bg: 'bg-[hsl(142,76%,36%)]/10',
    border: 'border-[hsl(142,76%,36%)]/30',
    text: 'text-[hsl(142,76%,36%)]',
  },
  'system-syntax': {
    bg: 'bg-[hsl(38,92%,50%)]/10',
    border: 'border-[hsl(38,92%,50%)]/30',
    text: 'text-[hsl(38,92%,50%)]',
  },
};

export default function Systems() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Sistemas</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os sistemas integrados ao painel centralizado
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Sistema
          </Button>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systems.map((system, index) => {
            const systemSubs = subscriptions.filter((s) => s.systemId === system.id);
            const systemPlans = plans.filter((p) => p.systemId === system.id);
            const activeCount = systemSubs.filter((s) => s.status === 'active').length;
            const totalRevenue = systemSubs
              .filter((s) => s.status === 'active')
              .reduce((acc, s) => acc + s.price, 0);
            const colors = systemColorClasses[system.color] || systemColorClasses['system-finance'];

            return (
              <div
                key={system.id}
                className={cn(
                  'rounded-xl border bg-card p-6 transition-all animate-slide-up',
                  colors.border
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn('p-3 rounded-xl', colors.bg)}>
                      <Settings className={cn('h-6 w-6', colors.text)} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{system.name}</h3>
                        <Badge
                          variant={system.isActive ? 'default' : 'secondary'}
                          className={cn(
                            system.isActive
                              ? 'bg-success/10 text-success hover:bg-success/20'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {system.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Acessar API
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Desativar sistema
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Clientes</span>
                    </div>
                    <span className="text-2xl font-bold">{activeCount}</span>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Planos</span>
                    </div>
                    <span className="text-2xl font-bold">{systemPlans.length}</span>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Receita</span>
                    </div>
                    <span className={cn('text-xl font-bold', colors.text)}>
                      R$ {(totalRevenue / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>

                {/* Plans */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Planos disponíveis</h4>
                  <div className="space-y-2">
                    {systemPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {plan.isActive ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">{plan.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          R$ {plan.price}
                          <span className="text-muted-foreground">/mês</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Info */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">API Endpoint:</span>
                      <code className="ml-2 px-2 py-1 rounded bg-muted text-xs">
                        {system.apiEndpoint}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Switch checked={system.isActive} />
                    </div>
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
