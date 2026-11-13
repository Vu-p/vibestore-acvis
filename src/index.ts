import { getProjectInfo, TaskManager } from './app.js';

function main() {
  const info = getProjectInfo();
  console.log(`🚀 ${info.name} v${info.version} (${info.environment})`);
  console.log(`Started at: ${info.startedAt}\n`);

  const taskManager = new TaskManager();
  const task1 = taskManager.createTask('Initialize TypeScript Node.js project');
  const task2 = taskManager.createTask('Setup Matt Pocock skills');
  const task3 = taskManager.createTask('Ready for user business logic');

  taskManager.completeTask(task1.id);
  taskManager.completeTask(task2.id);

  console.log('Current tasks:');
  for (const task of taskManager.listTasks()) {
    const status = task.completed ? '✅' : '⏳';
    console.log(`  ${status} [${task.id.slice(0, 8)}] ${task.title}`);
  }
}

main();
