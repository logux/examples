import { atom } from 'nanostores'

export enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export const filterStore = atom<Filter>(Filter.all)
