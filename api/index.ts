export const subprotocol = '1.0.0'

export type User = {
  id: string
  name: string
  password: string
}

export type Task = {
  text: string
  completed: boolean
  authorId?: string
}

export type TaskRecord = {
  id: string
  textChangeTime: number
  completedChangeTime: number
} & Task
