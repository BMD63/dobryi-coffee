<template>
  <client-only>
    <div>
      <div class="h1 mb-4">Пользователи</div>

      <div v-if="$fetchState.pending">
        <v-skeleton-loader
          type="list-item, list-item, list-item, list-item, list-item"
          class="mb-3"
        />
      </div>

      <div v-else>
        <div class="caption mb-4">
          Загружено: <strong>{{ users.length }}</strong> из {{ total }}
          (пока только первая пачка 100 — всё ок)
        </div>

        <v-alert v-if="!users.length" type="warning" outlined>
          Данных нет. Проверь плагин <code>plugins/api.ts</code>.
        </v-alert>

        <v-list two-line dense>
          <v-list-item v-for="u in users" :key="u.id">
            <v-list-item-content>
              <v-list-item-title>{{ u.name }} — {{ u.phone }}</v-list-item-title>
              <v-list-item-subtitle class="caption">
                {{ u.city.title }} · Баланс: {{ u.balance }} ₽ · Последний визит: {{ formatDate(u.lastVisit) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from '~/plugins/api'

export default defineComponent({
  name: 'UsersPage',
  data () {
    return {
      users: [] as User[],
      total: 0
    }
  },
  fetchOnServer: false, // чтобы skeleton был виден на клиенте
  async fetch () {
    // первая пачка: ровно 100
    const { items, total } = await (this as any).$api.users.list({ offset: 0, limit: 100 })
    this.users = items
    this.total = total
  },
  methods: {
    formatDate (ts: number) {
      return new Date(ts).toLocaleDateString()
    }
  }
})
</script>
