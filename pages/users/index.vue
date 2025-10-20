<template>
  <client-only>
    <div>
      <div class="h1 mb-4">Пользователи</div>

      <!-- skeleton + прогресс на время полной загрузки -->
      <div v-if="$fetchState.pending">
        <v-skeleton-loader
          type="list-item, list-item, list-item, list-item, list-item"
          class="mb-3"
        />
        <v-progress-linear
          :value="Math.min(100, Math.round((loaded / totalAll) * 100))"
          height="6"
          striped
          class="mt-2"
        />
        <div class="caption mt-1">Загружено: {{ loaded }} из {{ totalAll }}</div>
      </div>

      <div v-else>
        <users-toolbar
          :cities="cityList"
          :value-search="search"
          :value-cities="selectedCities"
          @update:search="search = $event"
          @update:cities="selectedCities = $event"
        />

        <div class="caption mb-3">
          Найдено: <strong>{{ filteredUsers.length }}</strong>
          (временно показываем первые 10)
        </div>

        <v-list two-line dense>
          <v-list-item v-for="u in filteredUsers.slice(0, 10)" :key="u.id">
            <v-list-item-content>
              <v-list-item-title>{{ u.name }} — {{ u.phone }}</v-list-item-title>
              <v-list-item-subtitle class="caption">
                {{ u.city.title }} · Баланс: {{ u.balance }} ₽ · Последний визит: {{ formatDate(u.lastVisit) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div class="caption mt-3">
          Загружено всего: <strong>{{ users.length }}</strong> из {{ totalAll }}
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UsersToolbar from '~/components/UsersToolbar.vue'
import type { User } from '~/plugins/api'

const TOTAL = 8000
const FIRST_LIMIT = 100
const MAX_LIMIT = 500

export default defineComponent({
  name: 'UsersPage',
  components: { UsersToolbar },
  data () {
    return {
      users: [] as User[],
      loaded: 0,
      search: '',
      selectedCities: [] as string[],
      cityList: [] as Array<{ id: string; title: string }>
    }
  },
  fetchOnServer: false,
  async fetch () {
    // 1) Первая пачка на 100
    {
      const { items } = await (this as any).$api.users.list({ offset: 0, limit: FIRST_LIMIT })
      this.users.push(...items)
      this.loaded = this.users.length
    }

    // 2) Остальное по 500 (последняя пачка — остаток)
    let offset = this.loaded
    while (offset < TOTAL) {
      const remaining = TOTAL - offset
      const limit = Math.min(MAX_LIMIT, remaining)
      const { items } = await (this as any).$api.users.list({ offset, limit })
      this.users.push(...items)
      offset += items.length
      this.loaded = this.users.length
    }

    // Справочник городов
    this.cityList = (this as any).$api.getCityList()
  },
  computed: {
    totalAll (): number {
      return TOTAL
    },
    filteredUsers (): User[] {
      const q = this.search.trim().toLowerCase()
      const selected = new Set(this.selectedCities)
      const norm = (s: string) => s.replace(/[\s-]/g, '')

      return this.users.filter(u => {
        const byQuery =
          !q ||
          u.name.toLowerCase().includes(q) ||
          norm(u.phone).includes(norm(q))
        const byCity = !selected.size || selected.has(u.city.id)
        return byQuery && byCity
      })
    }
  },
  methods: {
    formatDate (ts: number) {
      return new Date(ts).toLocaleDateString()
    }
  }
})
</script>
