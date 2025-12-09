import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { systems } from '@/data/mockData';

interface FiltersState {
  search: string;
  system: string;
  status: string;
  plan: string;
}

interface SubscriptionFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

export function SubscriptionFilters({ filters, onFiltersChange }: SubscriptionFiltersProps) {
  const hasActiveFilters = filters.system || filters.status || filters.plan;

  const clearFilters = () => {
    onFiltersChange({ search: '', system: '', status: '', plan: '' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-card animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente ou email..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 bg-muted/50 border-transparent focus:border-primary"
        />
      </div>

      <div className="flex gap-3">
        <Select
          value={filters.system}
          onValueChange={(value) => onFiltersChange({ ...filters, system: value })}
        >
          <SelectTrigger className="w-[160px] bg-muted/50 border-transparent">
            <SelectValue placeholder="Sistema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os sistemas</SelectItem>
            {systems.map((system) => (
              <SelectItem key={system.id} value={system.id}>
                {system.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-transparent">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="expired">Expirado</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
