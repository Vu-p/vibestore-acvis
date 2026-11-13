export interface ProjectInfo {
  name: string;
  version: string;
  environment: string;
  startedAt: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export class TaskManager {
  private tasks: Map<string, Task> = new Map();

  createTask(title: string): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  completeTask(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new Error(`Task with id "${id}" not found.`);
    }
    task.completed = true;
    return task;
  }
}

export function getProjectInfo(): ProjectInfo {
  return {
    name: 'ts-node-app',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    startedAt: new Date().toISOString(),
  };
}
