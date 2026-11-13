import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TaskManager, getProjectInfo } from '../app.js';

describe('TaskManager', () => {
  it('creates and lists tasks', () => {
    const manager = new TaskManager();
    const task = manager.createTask('Test task');
    assert.equal(task.title, 'Test task');
    assert.equal(task.completed, false);
    assert.equal(manager.listTasks().length, 1);
  });

  it('completes a task', () => {
    const manager = new TaskManager();
    const task = manager.createTask('Complete me');
    const completed = manager.completeTask(task.id);
    assert.equal(completed.completed, true);
  });

  it('throws error when completing non-existent task', () => {
    const manager = new TaskManager();
    assert.throws(() => manager.completeTask('non-existent'), {
      message: 'Task with id "non-existent" not found.',
    });
  });
});

describe('getProjectInfo', () => {
  it('returns valid project information', () => {
    const info = getProjectInfo();
    assert.equal(info.name, 'ts-node-app');
    assert.equal(info.version, '1.0.0');
    assert.ok(info.startedAt);
  });
});
