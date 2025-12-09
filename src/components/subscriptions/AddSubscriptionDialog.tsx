import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { systems, plans } from '@/data/mockData';
import { toast } from 'sonner';

export function AddSubscriptionDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    systemId: '',
    planId: '',
    autoRenew: true,
  });

  const filteredPlans = plans.filter((plan) => plan.systemId === formData.systemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Assinatura criada com sucesso!');
    setOpen(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      systemId: '',
      planId: '',
      autoRenew: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Assinatura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Nova Assinatura</DialogTitle>
            <DialogDescription>
              Preencha os dados do cliente e selecione o plano desejado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input
                id="customerName"
                placeholder="Nome da empresa ou cliente"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="email@empresa.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Sistema</Label>
              <Select
                value={formData.systemId}
                onValueChange={(value) => setFormData({ ...formData, systemId: value, planId: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sistema" />
                </SelectTrigger>
                <SelectContent>
                  {systems.map((system) => (
                    <SelectItem key={system.id} value={system.id}>
                      {system.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Plano</Label>
              <Select
                value={formData.planId}
                onValueChange={(value) => setFormData({ ...formData, planId: value })}
                disabled={!formData.systemId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - R$ {plan.price}/mês
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Renovação Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Renovar automaticamente quando expirar
                </p>
              </div>
              <Switch
                checked={formData.autoRenew}
                onCheckedChange={(checked) => setFormData({ ...formData, autoRenew: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Assinatura</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
