export const subprotocol = '1.0.0'

export type User = {
  id: string
  name: string
  password: string
}

export type Task = {
  id: string
  text: string
  completed: boolean
  userId: string | null
}
