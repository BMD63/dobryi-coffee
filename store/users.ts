// store/users.ts
import type { User } from '~/plugins/api'

export const state = () => ({
  list: [] as User[],
  loaded: 0,
  cities: [] as Array<{ id: string; title: string }>
})

export type UsersState = ReturnType<typeof state>

export const mutations = {
  setUsers (state: UsersState, items: User[]) {
    state.list = items
    state.loaded = items.length
  },
  appendUsers (state: UsersState, items: User[]) {
    state.list.push(...items)
    state.loaded = state.list.length
  },
  setCities (state: UsersState, cities: Array<{ id: string; title: string }>) {
    state.cities = cities
  },
  reset (state: UsersState) {
    state.list = []
    state.loaded = 0
    state.cities = []
  }
}
