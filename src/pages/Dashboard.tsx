import { Layout } from '@/components/layout/Layout';
import { SystemCard } from '@/components/dashboard/SystemCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentSubscriptions } from '@/components/dashboard/RecentSubscriptions';
import { SubscriptionChart } from '@/components/dashboard/SubscriptionChart';
import { systems, subscriptions } from '@/data/mockData';
import { CreditCard, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const totalActive = subscriptions.filter((s) => s.status === 'active').length;
  const totalInactive = subscriptions.filter((s) => s.status !== 'active').length;
  const totalRevenue = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((acc, s) => acc + s.price, 0);
  const expiringCount = subscriptions.filter((s) => {
    const expDate = new Date(s.expirationDate);
    const now = new Date();
    const diffDays = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0 && s.status === 'active';
  }).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do gerenciamento de assinaturas
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Assinaturas"
            value={subscriptions.length}
            change="+8.2%"
            changeType="positive"
            icon={CreditCard}
            index={0}
          />
          <StatsCard
            title="Clientes Ativos"
            value={totalActive}
            change="+12.5%"
            changeType="positive"
            icon={Users}
            index={1}
          />
          <StatsCard
            title="Receita Mensal"
            value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`}
            change="+15.3%"
            changeType="positive"
            icon={TrendingUp}
            index={2}
          />
          <StatsCard
            title="Expirando em 30 dias"
            value={expiringCount}
            change={expiringCount > 0 ? 'Ação necessária' : ''}
            changeType={expiringCount > 0 ? 'negative' : 'neutral'}
            icon={AlertTriangle}
            index={3}
          />
        </div>

        {/* Systems Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sistemas Integrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systems.map((system, index) => (
              <SystemCard
                key={system.id}
                system={system}
                subscriptions={subscriptions.filter((s) => s.systemId === system.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubscriptionChart />
          <RecentSubscriptions subscriptions={subscriptions} />
        </div>
      </div>
    </Layout>
  );
}
