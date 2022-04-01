import { Task, User } from '../api'

let users = [
  { id: '1', name: 'admin', password: 'admin' },
  { id: '2', name: 'user', password: 'user' }
]
let tasks = [{ id: '1', text: 'Create logux example app', completed: false }]
let userTasks: Record<string, string[]> = { '1': ['1'], '2': [] }

export function findUser(name: string): User | undefined {
  return users.find(it => it.name === name)
}

export function getUserTasks(userId: string): Promise<Task[]> {
  const newTasks = tasks.filter(it => userTasks[userId].includes(it.id))
  return Promise.resolve(newTasks)
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
