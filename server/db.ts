import { TaskRecord, User } from '../api/index.js'

let users = [
  { id: '1', name: 'admin', password: 'admin' },
  { id: '2', name: 'user', password: 'user' }
]
let tasks: TaskRecord[] = [
  {
    id: '1',
    text: 'Create logux example app',
    textChangeTime: 0,
    completed: false,
    completedChangeTime: 0,
    authorId: '1'
  }
]
let userTasks: Record<string, string[]> = { '1': ['1'], '2': [] }

export function getAllTasks(): Promise<TaskRecord[]> {
  return Promise.resolve(tasks)
}

export function findUser(name: string): User | undefined {
  return users.find(it => it.name === name)
}

export function getUserTasks(userId: string): Promise<TaskRecord[]> {
  return Promise.resolve(tasks.filter(it => userTasks[userId].includes(it.id)))
}

export function findTask(taskId: string): Promise<TaskRecord | undefined> {
  return Promise.resolve(tasks.find(it => it.id === taskId))
}

export function createTask(
  userId: string,
  task: TaskRecord
): Promise<TaskRecord> {
  tasks.push(task)
  userTasks[userId].push(task.id)
  return Promise.resolve(task)
}

export function changeTask(
  taskId: string,
  patch: Partial<Omit<TaskRecord, 'id'>>
): Promise<TaskRecord> {
  tasks = tasks.map(it => {
    if (it.id !== taskId) return it
    return { ...it, ...patch }
  })
  return Promise.resolve(tasks.find(it => it.id === taskId)!)
}

export function deleteTask(taskId: string): Promise<void> {
  tasks = tasks.filter(it => it.id !== taskId)

  users.forEach(user => {
    userTasks[user.id].filter(id => id !== taskId)
  })

  return Promise.resolve()
}
