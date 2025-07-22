export type Priority = 'alta' | 'media' | 'baixa';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
  isDone: boolean;
  createdAt: Date;
}

export interface TaskFilters {
  category: string;
  status: 'all' | 'completed' | 'pending';
  priority: Priority | 'all';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  byCategory: Record<string, number>;
  byPriority: Record<Priority, number>;
} 