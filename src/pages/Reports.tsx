import { Layout } from '@/components/layout/Layout';
import { systems, subscriptions } from '@/data/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Revenue by month data
const revenueData = [
  { month: 'Jan', estoque: 4800, finance: 3200, syntax: 1600 },
  { month: 'Fev', estoque: 5200, finance: 3800, syntax: 2100 },
  { month: 'Mar', estoque: 5800, finance: 4200, syntax: 2800 },
  { month: 'Abr', estoque: 6400, finance: 4800, syntax: 3200 },
  { month: 'Mai', estoque: 7200, finance: 5400, syntax: 3800 },
  { month: 'Jun', estoque: 7800, finance: 6000, syntax: 4200 },
];

// Subscription status data
const statusData = [
  { name: 'Ativos', value: 8, color: 'hsl(142, 76%, 36%)' },
  { name: 'Pendentes', value: 1, color: 'hsl(38, 92%, 50%)' },
  { name: 'Expirados', value: 2, color: 'hsl(0, 72%, 51%)' },
  { name: 'Inativos', value: 1, color: 'hsl(217, 33%, 35%)' },
];

// Plan distribution data
const planData = [
  { plan: 'Básico', count: 3 },
  { plan: 'Profissional', count: 5 },
  { plan: 'Enterprise', count: 4 },
];

export default function Reports() {
  const totalRevenue = revenueData[revenueData.length - 1];
  const monthlyTotal =
    (totalRevenue?.estoque || 0) + (totalRevenue?.finance || 0) + (totalRevenue?.syntax || 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Análises detalhadas de assinaturas e receitas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="6m">
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mês</SelectItem>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 animate-slide-up">
            <p className="text-sm text-muted-foreground">Receita Total (6 meses)</p>
            <p className="text-3xl font-bold mt-2">
              R$ {(monthlyTotal * 6).toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-success mt-1">+23.5% vs período anterior</p>
          </div>
          <div
            className="rounded-xl border border-border bg-card p-6 animate-slide-up"
            style={{ animationDelay: '50ms' }}
          >
            <p className="text-sm text-muted-foreground">Média Mensal</p>
            <p className="text-3xl font-bold mt-2">R$ {monthlyTotal.toLocaleString('pt-BR')}</p>
            <p className="text-sm text-success mt-1">+15.2% vs mês anterior</p>
          </div>
          <div
            className="rounded-xl border border-border bg-card p-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            <p className="text-sm text-muted-foreground">Taxa de Retenção</p>
            <p className="text-3xl font-bold mt-2">94.5%</p>
            <p className="text-sm text-success mt-1">+2.3% vs período anterior</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Receita por Sistema</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorEstoque" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFinance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSyntax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `R$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 10%)',
                      border: '1px solid hsl(217, 33%, 17%)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="estoque"
                    name="Estoque"
                    stroke="hsl(280, 65%, 60%)"
                    strokeWidth={2}
                    fill="url(#colorEstoque)"
                  />
                  <Area
                    type="monotone"
                    dataKey="finance"
                    name="Finance"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth={2}
                    fill="url(#colorFinance)"
                  />
                  <Area
                    type="monotone"
                    dataKey="syntax"
                    name="Syntax"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth={2}
                    fill="url(#colorSyntax)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Status das Assinaturas</h3>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 10%)',
                      border: '1px solid hsl(217, 33%, 17%)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Plan Distribution */}
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Distribuição por Plano</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                  <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis type="category" dataKey="plan" stroke="hsl(215, 20%, 55%)" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 10%)',
                      border: '1px solid hsl(217, 33%, 17%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" name="Assinaturas" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
