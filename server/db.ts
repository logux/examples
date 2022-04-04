import { Task, User } from '../api/index.js'

let users = [
  { id: '1', name: 'admin', password: 'admin' },
  { id: '2', name: 'user', password: 'user' }
]
let tasks: Task[] = [
  { id: '1', text: 'Create logux example app', completed: false, userId: '1' }
]
let userTasks: Record<string, string[]> = { '1': ['1'], '2': [] }

export function findUser(name: string): User | undefined {
  return users.find(it => it.name === name)
}

export function getUserTasks(userId: string): Promise<Task[]> {
  return Promise.resolve(tasks.filter(it => userTasks[userId].includes(it.id)))
}

export function findTask(taskId: string): Promise<Task | undefined> {
  return Promise.resolve(tasks.find(it => it.id === taskId))
}

export function createTask(userId: string, task: Task): Promise<Task> {
  tasks.push(task)
  userTasks[userId].push(task.id)
  return Promise.resolve(task)
}

export function changeTask(
  taskId: string,
  patch: Partial<Omit<Task, 'id'>>
): Promise<Task> {
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
