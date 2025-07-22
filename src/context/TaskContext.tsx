import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, Priority, TaskFilters, TaskStats } from '../types/task';
import { saveTasks, loadTasks } from '../utils/storage';

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  stats: TaskStats;
}

type TaskAction =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> };

interface TaskContextType {
  state: TaskState;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  getFilteredTasks: () => Task[];
  getAllCategories: () => string[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function calculateStats(tasks: Task[]): TaskStats {
  const completed = tasks.filter(task => task.isDone).length;
  const pending = tasks.length - completed;
  
  const byCategory: Record<string, number> = {};
  const byPriority: Record<Priority, number> = { alta: 0, media: 0, baixa: 0 };
  
  tasks.forEach(task => {
    byCategory[task.category] = (byCategory[task.category] || 0) + 1;
    byPriority[task.priority]++;
  });
  
  return {
    total: tasks.length,
    completed,
    pending,
    byCategory,
    byPriority
  };
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  let newTasks: Task[];
  
  switch (action.type) {
    case 'LOAD_TASKS':
      newTasks = action.payload;
      break;
      
    case 'ADD_TASK':
      newTasks = [...state.tasks, action.payload];
      break;
      
    case 'EDIT_TASK':
      newTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );
      break;
      
    case 'DELETE_TASK':
      newTasks = state.tasks.filter(task => task.id !== action.payload);
      break;
      
    case 'TOGGLE_TASK':
      newTasks = state.tasks.map(task =>
        task.id === action.payload
          ? { ...task, isDone: !task.isDone }
          : task
      );
      break;
      
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
      
    default:
      return state;
  }
  
  return {
    ...state,
    tasks: newTasks,
    stats: calculateStats(newTasks)
  };
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const initialState: TaskState = {
    tasks: [],
    filters: {
      category: 'all',
      status: 'all',
      priority: 'all'
    },
    stats: {
      total: 0,
      completed: 0,
      pending: 0,
      byCategory: {},
      byPriority: { alta: 0, media: 0, baixa: 0 }
    }
  };
  
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  // Carregar tarefas do localStorage na inicialização
  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
  }, []);
  
  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    if (state.tasks.length > 0 || loadTasks().length > 0) {
      saveTasks(state.tasks);
    }
  }, [state.tasks]);
  
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };
  
  const editTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, updates } });
  };
  
  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };
  
  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };
  
  const setFilters = (filters: Partial<TaskFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };
  
  const getFilteredTasks = (): Task[] => {
    return state.tasks.filter(task => {
      const matchesCategory = state.filters.category === 'all' || task.category === state.filters.category;
      const matchesStatus = state.filters.status === 'all' || 
        (state.filters.status === 'completed' && task.isDone) ||
        (state.filters.status === 'pending' && !task.isDone);
      const matchesPriority = state.filters.priority === 'all' || task.priority === state.filters.priority;
      
      return matchesCategory && matchesStatus && matchesPriority;
    });
  };
  
  const getAllCategories = (): string[] => {
    const categories = new Set(state.tasks.map(task => task.category));
    return Array.from(categories);
  };
  
  return (
    <TaskContext.Provider value={{
      state,
      addTask,
      editTask,
      deleteTask,
      toggleTask,
      setFilters,
      getFilteredTasks,
      getAllCategories
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de TaskProvider');
  }
  return context;
} 