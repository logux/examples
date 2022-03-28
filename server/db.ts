import { User } from '../api'

let users = [
  { id: '1', name: 'admin', password: 'admin' },
  { id: '2', name: 'user', password: 'user' }
]

export function findUser(name: string): User | undefined {
  return users.find(it => it.name === name)
}
