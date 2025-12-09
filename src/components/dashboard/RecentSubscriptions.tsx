import { Subscription } from '@/types/subscription';
import { systems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RecentSubscriptionsProps {
  subscriptions: Subscription[];
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-success/10', text: 'text-success', label: 'Ativo' },
  inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inativo' },
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pendente' },
  cancelled: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Cancelado' },
  expired: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Expirado' },
};

export function RecentSubscriptions({ subscriptions }: RecentSubscriptionsProps) {
  const sortedSubscriptions = [...subscriptions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Assinaturas Recentes</h3>
        <p className="text-sm text-muted-foreground">Últimas movimentações de assinaturas</p>
      </div>
      <div className="divide-y divide-border">
        {sortedSubscriptions.map((subscription, index) => {
          const system = systems.find((s) => s.id === subscription.systemId);
          const status = statusStyles[subscription.status];

          return (
            <div
              key={subscription.id}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {subscription.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{subscription.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {system?.name} • {subscription.planName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">R$ {subscription.price}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(subscription.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </p>
                </div>
                <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', status.bg, status.text)}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
