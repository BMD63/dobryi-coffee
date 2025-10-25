// plugins/api.ts
import { Plugin } from '@nuxt/types'
import {
  USERS_TOTAL,
  USERS_MAX_LIMIT,
  NETWORK_OVERHEAD_MS,
} from '~/constants/users'
import { CITY_POOL, FIRST_NAMES } from '~/constants/data'
import type { City } from '~/constants/data'

export type User = {
  id: string
  balance: number
  cashbackPercent: number
  city: City
  isBlocked: boolean
  lastSave: number
  lastSpend: number
  lastVisit: number
  name: string
  phone: string
  role: 'customer'
  saveCount: number
  saveTotal: number
  spendCount: number
  spendTotal: number
  updatedAt: number
  createdAt: number
}

const delay = (ms: number) =>
  new Promise<void>((_resolve) => {
    setTimeout(() => _resolve(), ms)
  })
const seeded = (n: number) => {
  const x = Math.sin(n + 1) * 10000
  return x - Math.floor(x)
}
const pad2 = (n: number) => String(n).padStart(2, '0')

function makeUser(i: number): User {
  const r = seeded(i)
  const name = FIRST_NAMES[i % FIRST_NAMES.length]
  const city = CITY_POOL[i % CITY_POOL.length]
  const baseTs = 1696497035090

  const phoneTail = 1000 + (i % 9000)
  const phone = `+79*****${pad2(Math.floor(phoneTail / 100))}${String(
    phoneTail
  ).slice(-2)}`

  return {
    id: `u${i.toString(16).padStart(5, '0')}${Math.floor(seeded(i) * 0xffff)
      .toString(16)
      .padStart(4, '0')}`,
    balance: Math.floor(r * 1000),
    cashbackPercent: 10,
    city,
    isBlocked: false,
    lastSave: baseTs - (i % 30) * 86400000,
    lastSpend: baseTs - (i % 45) * 86400000,
    lastVisit: baseTs - (i % 365) * 86400000,
    name,
    phone,
    role: 'customer',
    saveCount: Math.floor(r * 100),
    saveTotal: Math.floor(r * 1000),
    spendCount: Math.floor(seeded(i + 7) * 20),
    spendTotal: Math.floor(seeded(i + 11) * 900),
    updatedAt: baseTs - (i % 365) * 86400000,
    createdAt: baseTs - (i % 600) * 86400000,
  }
}

const apiPlugin: Plugin = (_ctx, inject) => {
  async function list({
    offset = 0,
    limit = 100,
  }: {
    offset?: number
    limit?: number
  }) {
    const safeLimit = Math.min(Math.max(limit, 1), USERS_MAX_LIMIT)
    const end = Math.min(offset + safeLimit, USERS_TOTAL)

    await delay(NETWORK_OVERHEAD_MS)

    const items: User[] = []
    for (let i = offset; i < end; i++) items.push(makeUser(i))
    return { items, total: USERS_TOTAL }
  }

  function getCityList() {
    return CITY_POOL
  }

  inject('api', { users: { list }, getCityList })
}

export default apiPlugin
