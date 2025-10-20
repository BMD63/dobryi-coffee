import { Plugin } from '@nuxt/types'

type City = { id: string; title: string }

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

const TOTAL = 8000

const cityPool: City[] = [
  { id: 'c_tlt', title: 'Тольятти' },
  { id: 'c_smr', title: 'Самара' },
  { id: 'c_orb', title: 'Оренбург' },
  { id: 'c_nnv', title: 'Нижний Новгород' },
  { id: 'c_msk', title: 'Москва' },
  { id: 'c_sml', title: 'Смоленск' },
]

const firstNames = ['Галина','Иван','Анна','Павел','Мария','Алексей','Наталья','Сергей','Ольга','Дмитрий']

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
const seeded = (n: number) => {
  const x = Math.sin(n + 1) * 10000
  return x - Math.floor(x)
}
const pad2 = (n: number) => String(n).padStart(2, '0')

function makeUser(i: number): User {
  const r = seeded(i)
  const name = firstNames[i % firstNames.length]
  const city = cityPool[i % cityPool.length]
  const baseTs = 1696497035090

  const phoneTail = 1000 + (i % 9000)
  const phone = `+79*****${pad2(Math.floor(phoneTail / 100))}${String(phoneTail).slice(-2)}`

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
  async function list({ offset = 0, limit = 100 }: { offset?: number; limit?: number }) {
    const safeLimit = Math.min(Math.max(limit, 1), 500)
    const end = Math.min(offset + safeLimit, TOTAL)

    await delay(500) //имитация задержки сети

    const items: User[] = []
    for (let i = offset; i < end; i++) items.push(makeUser(i))
    return { items, total: TOTAL }
  }

  function getCityList() {
    return cityPool
  }

  inject('api', { users: { list }, getCityList })
}

export default apiPlugin
