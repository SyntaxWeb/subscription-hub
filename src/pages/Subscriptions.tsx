import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SubscriptionFilters } from '@/components/subscriptions/SubscriptionFilters';
import { SubscriptionTable } from '@/components/subscriptions/SubscriptionTable';
import { AddSubscriptionDialog } from '@/components/subscriptions/AddSubscriptionDialog';
import { subscriptions } from '@/data/mockData';
import { toast } from 'sonner';

export default function Subscriptions() {
  const [filters, setFilters] = useState({
    search: '',
    system: '',
    status: '',
    plan: '',
  });

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        !filters.search ||
        sub.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        sub.customerEmail.toLowerCase().includes(filters.search.toLowerCase());

      const matchesSystem = !filters.system || filters.system === 'all' || sub.systemId === filters.system;
      const matchesStatus = !filters.status || filters.status === 'all' || sub.status === filters.status;

      return matchesSearch && matchesSystem && matchesStatus;
    });
  }, [filters]);

  const handleEdit = (subscription: any) => {
    toast.info(`Editando assinatura de ${subscription.customerName}`);
  };

  const handleDelete = (subscription: any) => {
    toast.error(`Assinatura de ${subscription.customerName} cancelada`);
  };

  const handleRenew = (subscription: any) => {
    toast.success(`Assinatura de ${subscription.customerName} renovada`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Assinaturas</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todas as assinaturas de seus sistemas
            </p>
          </div>
          <AddSubscriptionDialog />
        </div>

        {/* Filters */}
        <SubscriptionFilters filters={filters} onFiltersChange={setFilters} />

        {/* Results count */}
        <div className="text-sm text-muted-foreground animate-fade-in">
          Mostrando {filteredSubscriptions.length} de {subscriptions.length} assinaturas
        </div>

        {/* Table */}
        <SubscriptionTable
          subscriptions={filteredSubscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRenew={handleRenew}
        />
      </div>
    </Layout>
  );
}
