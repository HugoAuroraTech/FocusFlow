import { Filter, Download, RotateCcw } from 'lucide-react';
import type { TaskFilters, Priority } from '../types/task';

interface FilterBarProps {
  filters: TaskFilters;
  onFiltersChange: (filters: Partial<TaskFilters>) => void;
  categories: string[];
  onExport: () => void;
  taskCount: {
    total: number;
    filtered: number;
    completed: number;
    pending: number;
  };
}

export function FilterBar({ 
  filters, 
  onFiltersChange, 
  categories, 
  onExport, 
  taskCount 
}: FilterBarProps) {
  
  const handleReset = () => {
    onFiltersChange({
      category: 'all',
      status: 'all',
      priority: 'all'
    });
  };
  
  const hasActiveFilters = filters.category !== 'all' || 
                          filters.status !== 'all' || 
                          filters.priority !== 'all';
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      {/* Header com estatísticas */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Estatísticas */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">{taskCount.filtered}</span>
            {taskCount.filtered !== taskCount.total && (
              <span className="text-gray-400"> de {taskCount.total}</span>
            )} tarefas
          </div>
          
          {/* Botão de exportar */}
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            title="Exportar tarefas"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filtro por Status */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value as any })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes ({taskCount.pending})</option>
            <option value="completed">Concluídas ({taskCount.completed})</option>
          </select>
        </div>
        
        {/* Filtro por Categoria */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro por Prioridade */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFiltersChange({ priority: e.target.value as Priority | 'all' })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
        
        {/* Botão de Reset */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded border border-gray-300 transition-colors"
              title="Limpar filtros"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar
            </button>
          )}
        </div>
      </div>
      
      {/* Indicadores de filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Status: {filters.status === 'pending' ? 'Pendentes' : 'Concluídas'}
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Categoria: {filters.category}
            </span>
          )}
          {filters.priority !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
              Prioridade: {filters.priority}
            </span>
          )}
        </div>
      )}
    </div>
  );
} 