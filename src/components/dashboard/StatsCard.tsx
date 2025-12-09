import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  index?: number;
}

export function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, index = 0 }: StatsCardProps) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3">
        <span className="text-3xl font-bold">{value}</span>
        {change && (
          <span
            className={cn(
              'ml-2 text-sm font-medium',
              changeType === 'positive' && 'text-success',
              changeType === 'negative' && 'text-destructive',
              changeType === 'neutral' && 'text-muted-foreground'
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
