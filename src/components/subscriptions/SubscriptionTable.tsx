import { Subscription } from '@/types/subscription';
import { systems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MoreHorizontal, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
  onDelete?: (subscription: Subscription) => void;
  onRenew?: (subscription: Subscription) => void;
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-success/10', text: 'text-success', label: 'Ativo' },
  inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inativo' },
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pendente' },
  cancelled: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Cancelado' },
  expired: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Expirado' },
};

const systemColors: Record<string, string> = {
  estoque: 'bg-[hsl(280,65%,60%)]/10 text-[hsl(280,65%,60%)]',
  finance: 'bg-[hsl(142,76%,36%)]/10 text-[hsl(142,76%,36%)]',
  syntax: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)]',
};

export function SubscriptionTable({ subscriptions, onEdit, onDelete, onRenew }: SubscriptionTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground">Cliente</TableHead>
            <TableHead className="text-muted-foreground">Sistema</TableHead>
            <TableHead className="text-muted-foreground">Plano</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Valor</TableHead>
            <TableHead className="text-muted-foreground">Expiração</TableHead>
            <TableHead className="text-muted-foreground text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription, index) => {
            const system = systems.find((s) => s.id === subscription.systemId);
            const status = statusStyles[subscription.status];
            const systemColor = systemColors[subscription.systemId] || systemColors.finance;

            return (
              <TableRow
                key={subscription.id}
                className="border-border hover:bg-muted/30 animate-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {subscription.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{subscription.customerName}</p>
                      <p className="text-sm text-muted-foreground">{subscription.customerEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', systemColor)}>
                    {system?.name}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{subscription.planName}</TableCell>
                <TableCell>
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', status.bg, status.text)}>
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  R$ {subscription.price.toLocaleString('pt-BR')}
                  <span className="text-xs text-muted-foreground ml-1">/mês</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(subscription.expirationDate), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(subscription)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onRenew?.(subscription)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renovar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete?.(subscription)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancelar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
