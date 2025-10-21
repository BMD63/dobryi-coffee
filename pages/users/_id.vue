<template>
  <div>
    <v-btn text class="mb-4" @click="$router.back()">
      <v-icon left>mdi-arrow-left</v-icon> Назад
    </v-btn>

    <v-skeleton-loader v-if="$fetchState.pending" type="article" />

    <div v-else>
      <div class="h1 mb-2">Пользователь: {{ user?.name }}</div>
      <div class="body mb-4 caption">ID: {{ user?.id }}</div>

      <v-simple-table dense class="mb-6">
        <tbody>
          <tr><td>Телефон</td><td>{{ user?.phone }}</td></tr>
          <tr><td>Город</td><td>{{ user?.city.title }}</td></tr>
          <tr><td>Баланс</td><td>{{ user?.balance }} ₽</td></tr>
          <tr><td>Накоплено</td><td>{{ user?.saveTotal }} ₽</td></tr>
          <tr><td>Потрачено</td><td>{{ user?.spendTotal }} ₽</td></tr>
          <tr><td>Последний визит</td><td>{{ formatDate(user?.lastVisit) }}</td></tr>
          <tr><td>Создан</td><td>{{ formatDate(user?.createdAt) }}</td></tr>
          <tr><td>Обновлён</td><td>{{ formatDate(user?.updatedAt) }}</td></tr>
          <tr><td>Статус</td><td>{{ user?.isBlocked ? 'Заблокирован' : 'Активен' }}</td></tr>
        </tbody>
      </v-simple-table>

      <v-alert type="info" outlined>
        Здесь могла быть расширенная аналитика по клиенту.
      </v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from '~/plugins/api'
import { USERS_TOTAL, USERS_FIRST_LIMIT, USERS_MAX_LIMIT } from '~/constants/users'

export default defineComponent({
  name: 'UserDetailsPage',
  data () {
    return {
      user: null as User | null
    }
  },
  fetchOnServer: false,
  async fetch () {
    const id = this.$route.params.id as string

    let offset = 0
    let found: User | null = null

    // сначала первая сотня
    {
      const { items } = await (this as any).$api.users.list({ offset, limit: USERS_FIRST_LIMIT })
      found = items.find((u: User) => u.id === id) || null
      offset += items.length
    }

    while (!found && offset < USERS_TOTAL) {
      const limit = Math.min(USERS_MAX_LIMIT, USERS_TOTAL - offset)
      const { items } = await (this as any).$api.users.list({ offset, limit })
      found = items.find((u: User) => u.id === id) || null
      offset += items.length
    }

    this.user = found
  },
  methods: {
    formatDate (ts?: number) {
      if (!ts) return ''
      return new Date(ts).toLocaleDateString()
    }
  }
})
</script>
