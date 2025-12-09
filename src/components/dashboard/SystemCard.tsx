import { System, Subscription } from '@/types/subscription';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Users, CreditCard } from 'lucide-react';

interface SystemCardProps {
  system: System;
  subscriptions: Subscription[];
  index: number;
}

export function SystemCard({ system, subscriptions, index }: SystemCardProps) {
  const activeCount = subscriptions.filter((s) => s.status === 'active').length;
  const inactiveCount = subscriptions.filter((s) => s.status !== 'active').length;
  const totalRevenue = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((acc, s) => acc + s.price, 0);

  const colorClasses: Record<string, { bg: string; text: string; glow: string }> = {
    'system-estoque': {
      bg: 'bg-[hsl(280,65%,60%)]/10',
      text: 'text-[hsl(280,65%,60%)]',
      glow: 'shadow-[0_0_30px_-5px_hsl(280,65%,60%,0.3)]',
    },
    'system-finance': {
      bg: 'bg-[hsl(142,76%,36%)]/10',
      text: 'text-[hsl(142,76%,36%)]',
      glow: 'shadow-[0_0_30px_-5px_hsl(142,76%,36%,0.3)]',
    },
    'system-syntax': {
      bg: 'bg-[hsl(38,92%,50%)]/10',
      text: 'text-[hsl(38,92%,50%)]',
      glow: 'shadow-[0_0_30px_-5px_hsl(38,92%,50%,0.3)]',
    },
  };

  const colors = colorClasses[system.color] || colorClasses['system-finance'];

  return (
    <div
      className={cn(
        'relative group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 animate-slide-up',
        colors.glow
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className={cn('inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2', colors.bg, colors.text)}>
            {system.name}
          </div>
          <p className="text-sm text-muted-foreground">{system.description}</p>
        </div>
        <div className={cn('p-3 rounded-lg', colors.bg)}>
          <CreditCard className={cn('h-5 w-5', colors.text)} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ativos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{activeCount}</span>
            <span className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-0.5" />
              +12%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Inativos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{inactiveCount}</span>
            {inactiveCount > 0 && (
              <span className="flex items-center text-xs text-destructive">
                <TrendingDown className="h-3 w-3 mr-0.5" />
                -5%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Revenue */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Receita Mensal</span>
          <span className={cn('text-xl font-bold', colors.text)}>
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
