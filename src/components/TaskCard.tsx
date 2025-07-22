import { motion } from 'framer-motion';
import { Check, Edit2, Trash2, AlertCircle, Circle, Clock } from 'lucide-react';
import type { Task, Priority } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig: Record<Priority, { 
  color: string; 
  bgColor: string; 
  icon: React.ReactNode;
  label: string;
}> = {
  alta: {
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Alta'
  },
  media: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    icon: <Clock className="w-4 h-4" />,
    label: 'Média'
  },
  baixa: {
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    icon: <Circle className="w-4 h-4" />,
    label: 'Baixa'
  }
};

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const priorityStyle = priorityConfig[task.priority];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        task.isDone 
          ? 'bg-gray-50 border-gray-200 opacity-75' 
          : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox para marcar como concluída */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.isDone
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.isDone && <Check className="w-4 h-4" />}
        </button>
        
        <div className="flex-1 min-w-0">
          {/* Título e categoria */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-semibold text-gray-900 ${
              task.isDone ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            
            {/* Badge da categoria */}
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {task.category}
            </span>
          </div>
          
          {/* Descrição */}
          {task.description && (
            <p className={`text-sm text-gray-600 mb-3 ${
              task.isDone ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}
          
          {/* Prioridade e data */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityStyle.color} ${priorityStyle.bgColor}`}>
              {priorityStyle.icon}
              <span>{priorityStyle.label}</span>
            </div>
            
            <span className="text-xs text-gray-500">
              {task.createdAt.toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex-shrink-0 flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar tarefa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
} 