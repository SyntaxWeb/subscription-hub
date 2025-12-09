import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Layers,
  PlusCircle,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Assinaturas', href: '/subscriptions', icon: CreditCard },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Sistemas', href: '/systems', icon: Layers },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  { name: 'Notificações', href: '/notifications', icon: Bell },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">SubManager</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg glow-primary'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Add System Button */}
        <div className="p-3 border-t border-sidebar-border">
          <NavLink
            to="/systems/new"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
              'border border-dashed border-muted-foreground/30 hover:border-primary hover:text-primary',
              collapsed && 'justify-center'
            )}
          >
            <PlusCircle className="h-5 w-5" />
            {!collapsed && <span>Novo Sistema</span>}
          </NavLink>
        </div>

        {/* Settings */}
        <div className="p-3 border-t border-sidebar-border">
          <NavLink
            to="/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
              location.pathname === '/settings'
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            )}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Configurações</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
