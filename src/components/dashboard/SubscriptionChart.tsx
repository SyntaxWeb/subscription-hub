import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', estoque: 12, finance: 8, syntax: 5 },
  { month: 'Fev', estoque: 15, finance: 10, syntax: 7 },
  { month: 'Mar', estoque: 18, finance: 12, syntax: 9 },
  { month: 'Abr', estoque: 22, finance: 15, syntax: 12 },
  { month: 'Mai', estoque: 25, finance: 18, syntax: 15 },
  { month: 'Jun', estoque: 28, finance: 20, syntax: 18 },
  { month: 'Jul', estoque: 32, finance: 24, syntax: 22 },
  { month: 'Ago', estoque: 35, finance: 28, syntax: 25 },
  { month: 'Set', estoque: 38, finance: 30, syntax: 28 },
  { month: 'Out', estoque: 42, finance: 34, syntax: 32 },
  { month: 'Nov', estoque: 45, finance: 38, syntax: 35 },
  { month: 'Dez', estoque: 48, finance: 42, syntax: 38 },
];

export function SubscriptionChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Crescimento de Assinaturas</h3>
        <p className="text-sm text-muted-foreground">Evolução mensal por sistema</p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(280,65%,60%)]" />
          <span className="text-sm text-muted-foreground">Estoque</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(142,76%,36%)]" />
          <span className="text-sm text-muted-foreground">Finance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(38,92%,50%)]" />
          <span className="text-sm text-muted-foreground">Syntax</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(217, 33%, 17%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
            />
            <Area
              type="monotone"
              dataKey="estoque"
              stroke="hsl(280, 65%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEstoque)"
            />
            <Area
              type="monotone"
              dataKey="finance"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFinance)"
            />
            <Area
              type="monotone"
              dataKey="syntax"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSyntax)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
