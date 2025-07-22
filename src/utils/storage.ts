import type { Task } from '../types/task';

const STORAGE_KEY = 'focusflow_tasks';

export function saveTasks(tasks: Task[]): void {
  try {
    const serializedTasks = tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedTasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
}

export function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsedTasks = JSON.parse(data);
    return parsedTasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
}

export function exportTasks(tasks: Task[]): void {
  try {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `focusflow_tasks_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar tarefas:', error);
  }
} 