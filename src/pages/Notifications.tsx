import { Layout } from '@/components/layout/Layout';
import { notifications, systems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bell, RefreshCw, AlertTriangle, Info, CheckCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const typeStyles: Record<string, { icon: any; bg: string; text: string }> = {
  renewal: {
    icon: RefreshCw,
    bg: 'bg-primary/10',
    text: 'text-primary',
  },
  expiration: {
    icon: AlertTriangle,
    bg: 'bg-destructive/10',
    text: 'text-destructive',
  },
  inactivity: {
    icon: AlertTriangle,
    bg: 'bg-warning/10',
    text: 'text-warning',
  },
  system: {
    icon: Info,
    bg: 'bg-success/10',
    text: 'text-success',
  },
};

export default function Notifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Notificações</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} notificações não lidas` : 'Todas as notificações foram lidas'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Marcar todas como lidas</Button>
            <Button variant="outline">Configurar alertas</Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
          <div className="divide-y divide-border">
            {notifications.map((notification, index) => {
              const typeStyle = typeStyles[notification.type];
              const Icon = typeStyle.icon;
              const system = systems.find((s) => s.id === notification.systemId);

              return (
                <div
                  key={notification.id}
                  className={cn(
                    'p-5 flex items-start gap-4 hover:bg-muted/30 transition-colors animate-slide-up',
                    !notification.read && 'bg-primary/5'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn('p-3 rounded-xl flex-shrink-0', typeStyle.bg)}>
                    <Icon className={cn('h-5 w-5', typeStyle.text)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{notification.title}</h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center gap-3 mt-3">
                          {system && (
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {system.name}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(notification.createdAt), "dd 'de' MMMM 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            {notification.read ? 'Marcar como não lida' : 'Marcar como lida'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Nenhuma notificação</h3>
            <p className="text-muted-foreground mt-1">
              Você receberá alertas sobre renovações e expirações aqui.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
