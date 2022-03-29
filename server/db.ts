import { Task, User } from '../api'

let users = [
  { id: '1', name: 'admin', password: 'admin' },
  { id: '2', name: 'user', password: 'user' }
]
let tasks: Task[] = [
  { id: '1', text: 'Create logux example app', completed: false }
]
let userTasks: Record<string, string[]> = { '1': ['1'], '2': [] }

export function findUser(name: string): User | undefined {
  return users.find(it => it.name === name)
}

export function getUserTasks(): Promise<Task[]> {
  // return Promise.resolve(tasks.filter(it => userTasks[userId].includes(it.id)))
  return Promise.resolve(tasks)
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
