<template>
  <client-only>
    <div>
      <div class="h1 mb-4">Пользователи</div>

      <!-- skeleton + прогресс во время полной загрузки -->
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
          · Страница {{ page }} из {{ pageCount }}
        </div>

        <!-- список текущей страницы -->
        <v-list two-line dense>
          <user-item
            v-for="u in paginated"
            :key="u.id"
            :id="u.id"
            :name="u.name"
            :phone="u.phone"
            :city="u.city"
            :balance="u.balance"
            :save-total="u.saveTotal"
            :spend-total="u.spendTotal"
            :last-visit="u.lastVisit"
            @city-click="onCityClick"
          />
        </v-list>

        <!-- пагинация -->
        <div class="d-flex justify-center mt-6">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="7"
            circle
            color="accent"
            class="pagination"
          />
        </div>

        <div class="caption mt-3">
          Загружено всего: <strong>{{ users.length }}</strong> из {{ totalAll }}
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import UserItem from '~/components/UserItem.vue'
import { defineComponent } from 'vue'
import UsersToolbar from '~/components/UsersToolbar.vue'
import type { User } from '~/plugins/api'

const TOTAL = 8000
const FIRST_LIMIT = 100
const MAX_LIMIT = 500
const PAGE_SIZE = 50

export default defineComponent({
  name: 'UsersPage',
  components: { UsersToolbar, UserItem },
  data () {
    return {
      users: [] as User[],
      loaded: 0,
      search: '',
      selectedCities: [] as string[],
      cityList: [] as Array<{ id: string; title: string }>,
      page: 1
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
    },
    pageCount (): number {
      return Math.max(1, Math.ceil(this.filteredUsers.length / PAGE_SIZE))
    },
    paginated (): User[] {
      const start = (this.page - 1) * PAGE_SIZE
      return this.filteredUsers.slice(start, start + PAGE_SIZE)
    }
  },
  watch: {
    // при изменении фильтров/поиска сбрасываемся на 1 страницу
    search () { this.page = 1 },
    selectedCities () { this.page = 1 }
  },
  methods: {
    formatDate (ts: number) { return new Date(ts).toLocaleDateString() },
    onCityClick (cityId: string) {
      // при клике по городу сузим фильтр до одного города и вернёмся на 1 страницу
      this.selectedCities = [cityId]
      this.page = 1
    }
  }
})
</script>

<style>
.pagination .v-pagination__item--active {
  background-color: #FFD166 !important;
  color: #000 !important;
  box-shadow: 0 2px 6px rgba(0,0,0,.12);
}
</style>
