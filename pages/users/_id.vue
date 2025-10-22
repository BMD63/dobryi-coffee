<template>
  <client-only>
    <div class="user-details">
      <v-btn text small class="mb-3" @click="$router.back()">
        <v-icon left small>mdi-arrow-left</v-icon> Назад
      </v-btn>

      <v-card v-if="$fetchState.pending" class="pa-4">
        <v-skeleton-loader type="list-item-avatar, list-item-two-line, divider, list-item-three-line" />
      </v-card>

      <v-card v-else-if="user" class="pa-4">
        <div class="d-flex align-center mb-2">
          <div class="h1 mr-3">{{ user.name }}</div>
          <v-chip v-if="user.isBlocked" small color="error" text-color="white">Заблокирован</v-chip>
        </div>

        <v-row dense>
          <!-- ОСНОВНОЕ -->
          <v-col cols="12" md="6">
            <v-list two-line dense class="flat-list">
              <v-subheader>Основное</v-subheader>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ID</v-list-item-title>
                  <v-list-item-subtitle>{{ user.id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Имя в заголовке, здесь не дублируем -->

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Телефон</v-list-item-title>
                  <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Роль</v-list-item-title>
                  <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Заблокирован</v-list-item-title>
                  <v-list-item-subtitle>{{ user.isBlocked ? 'Да' : 'Нет' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Город (title)</v-list-item-title>
                  <v-list-item-subtitle>{{ user.city.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Город (id)</v-list-item-title>
                  <v-list-item-subtitle>{{ user.city.id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- ФИНАНСЫ -->
          <v-col cols="12" md="6">
            <v-list two-line dense class="flat-list">
              <v-subheader>Финансы</v-subheader>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Баланс</v-list-item-title>
                  <v-list-item-subtitle>{{ money(user.balance) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Кэшбэк, %</v-list-item-title>
                  <v-list-item-subtitle>{{ user.cashbackPercent }}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Накоплено (saveTotal)</v-list-item-title>
                  <v-list-item-subtitle>{{ money(user.saveTotal) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Кол-во начислений (saveCount)</v-list-item-title>
                  <v-list-item-subtitle>{{ user.saveCount }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Потрачено (spendTotal)</v-list-item-title>
                  <v-list-item-subtitle>{{ money(user.spendTotal) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Кол-во трат (spendCount)</v-list-item-title>
                  <v-list-item-subtitle>{{ user.spendCount }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- ДАТЫ -->
          <v-col cols="12" md="6">
            <v-list two-line dense class="flat-list">
              <v-subheader>Даты</v-subheader>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Последний визит</v-list-item-title>
                  <v-list-item-subtitle>{{ dt(user.lastVisit) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Последнее начисление</v-list-item-title>
                  <v-list-item-subtitle>{{ dt(user.lastSave) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Последний расход</v-list-item-title>
                  <v-list-item-subtitle>{{ dt(user.lastSpend) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <v-list two-line dense class="flat-list">
              <v-subheader>Служебные</v-subheader>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Создан (createdAt)</v-list-item-title>
                  <v-list-item-subtitle>{{ dt(user.createdAt) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Обновлён (updatedAt)</v-list-item-title>
                  <v-list-item-subtitle>{{ dt(user.updatedAt) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <v-alert v-else type="error" outlined>
        Пользователь не найден.
      </v-alert>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from '~/plugins/api'
import { USERS_TOTAL, USERS_FIRST_LIMIT, USERS_MAX_LIMIT } from '~/constants/users'

export default defineComponent({
  name: 'UserDetailsPage',
  data () {
    return { user: null as User | null }
  },
  fetchOnServer: false,
  async fetch () {
    const id = this.$route.params.id as string

    const storeUsers = (this.$store.state as any).users
    if (storeUsers && storeUsers.list && storeUsers.list.length) {
      const cached = (storeUsers.list as User[]).find(u => u.id === id) || null
      if (cached) { this.user = cached; return }
    }

    {
      const { items } = await (this as any).$api.users.list({ offset: 0, limit: USERS_FIRST_LIMIT })
      const found = (items as User[]).find(u => u.id === id) || null
      if (found) { this.user = found; return }
    }
    let offset = USERS_FIRST_LIMIT
    while (!this.user && offset < USERS_TOTAL) {
      const limit = Math.min(USERS_MAX_LIMIT, USERS_TOTAL - offset)
      const { items } = await (this as any).$api.users.list({ offset, limit })
      const found = (items as User[]).find((u: User) => u.id === id) || null
      if (found) { this.user = found; break }
      offset += (items as User[]).length
    }
  },
  methods: {
    dt (ts: number) { return ts ? new Date(ts).toLocaleDateString() : '—' },
    money (n: number) { return `${n} ₽` }
  }
})
</script>

<style scoped>
.user-details .v-card { border-radius: 12px; }
.flat-list { background: transparent !important; }
</style>
