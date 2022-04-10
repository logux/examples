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
