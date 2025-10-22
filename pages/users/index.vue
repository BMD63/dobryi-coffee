<template>
  <client-only>
    <div class="users-page">
      <div class="h1 mb-4">Пользователи</div>
      <div v-if="$fetchState.pending">
        <v-card class="mb-4 pa-4">
          <v-skeleton-loader type="list-item@5" class="mb-3" />
          <v-progress-linear
            :value="Math.min(100, Math.round((loaded / totalAll) * 100))"
            height="6"
            striped
          />
          <div class="caption mt-1">Загружено: {{ loaded }} из {{ totalAll }}</div>
        </v-card>
      </div>

      <div v-else>
        <v-card class="mb-4 pa-3">
          <users-toolbar
            :cities="cityList"
            :value-search="search"
            :value-cities="selectedCities"
            @update:search="search = $event"
            @update:cities="selectedCities = $event"
          />
          <div class="caption mt-1">
            Найдено: <strong>{{ filteredUsers.length }}</strong> · Страница {{ page }} из {{ pageCount }}
          </div>
        </v-card>

        <!-- Список -->
        <v-card class="mb-4">
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
        </v-card>

        <!-- Пагинация -->
        <div class="d-flex justify-center mt-6">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="14"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
            class="pagination pagination--compact"
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
import { defineComponent } from 'vue'
import UsersToolbar from '~/components/UsersToolbar.vue'
import UserItem from '~/components/UserItem.vue'
import type { User } from '~/plugins/api'
import {
  USERS_TOTAL,
  USERS_FIRST_LIMIT,
  USERS_MAX_LIMIT,
  PAGE_SIZE
} from '~/constants/users'

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
    const cached = (this.$store.state as any).users
    if (cached && cached.list && cached.list.length) {
      this.users = cached.list
      this.loaded = cached.loaded
      this.cityList = cached.cities && cached.cities.length
        ? cached.cities
        : (this as any).$api.getCityList()
      if (!cached.cities || !cached.cities.length) {
        this.$store.commit('users/setCities', this.cityList)
      }
      return
    }

    {
      const { items } = await (this as any).$api.users.list({ offset: 0, limit: USERS_FIRST_LIMIT })
      this.users.push(...items)
      this.loaded = this.users.length
    }

    let offset = this.loaded
    while (offset < USERS_TOTAL) {
      const remaining = USERS_TOTAL - offset
      const limit = Math.min(USERS_MAX_LIMIT, remaining)
      const { items } = await (this as any).$api.users.list({ offset, limit })
      this.users.push(...items)
      offset += items.length
      this.loaded = this.users.length
    }

    this.cityList = (this as any).$api.getCityList()
    this.$store.commit('users/setUsers', this.users)
    this.$store.commit('users/setCities', this.cityList)
  },
  computed: {
    totalAll (): number { return USERS_TOTAL },
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
    search () { this.page = 1 },
    selectedCities () { this.page = 1 }
  },
  methods: {
    formatDate (ts: number) {
      return new Date(ts).toLocaleDateString()
    },
    onCityClick (cityId: string) {
      this.selectedCities = [cityId]
      this.page = 1
    }
  }
})
</script>

<style scoped>
.users-page :deep(.v-card) {
  border-radius: 14px;
}

:deep(.pagination--compact .v-pagination__navigation),
:deep(.pagination--compact .v-pagination__item) {
  height: 28px;
  min-width: 28px;
  font-size: 12px;
  line-height: 28px;
  margin: 0 2px;
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid;
}

/* светлая тема — белые плитки */
:deep(.theme--light .pagination--compact .v-pagination__navigation),
:deep(.theme--light .pagination--compact .v-pagination__item) {
  background: #fff;
  border-color: rgba(0,0,0,.12);
  color: rgba(0,0,0,.87);
}

/* тёмная тема — тёмные плитки */
:deep(.theme--dark .pagination--compact .v-pagination__navigation),
:deep(.theme--dark .pagination--compact .v-pagination__item) {
  background: #1E1E1E;
  border-color: rgba(255,255,255,.12);
  color: rgba(255,255,255,.87);
}

/* активная страница — жёлтая (усиленная специфичность) */
:deep(.pagination--compact .v-pagination__item.v-pagination__item--active) {
  background-color: #FFD166 !important;
  border-color: #FFD166 !important;
  color: #000 !important;
}

:deep(.pagination--compact .v-pagination__navigation .v-icon) {
  font-size: 16px;
  line-height: 28px;
}
</style>

