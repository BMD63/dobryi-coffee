<template>
  <client-only>
    <div class="user-details">
      <div class="h1 mb-4">Профиль пользователя</div>

      <!-- Skeleton / loading -->
      <v-card v-if="$fetchState.pending" class="pa-4 user-card">
        <v-skeleton-loader type="list-item@3" class="mb-4" />
        <v-skeleton-loader type="list-item@3" class="mb-4" />
        <v-skeleton-loader type="list-item@3" />
      </v-card>

      <!-- Not found -->
      <v-alert v-else-if="!user" type="error" outlined class="mb-4">
        Пользователь не найден.
      </v-alert>

      <!-- Content -->
      <v-container v-else fluid class="pa-0">
        <v-row dense>
          <!-- Основное -->
          <v-col cols="12" md="6">
            <v-card class="user-card pa-4">
              <div class="section-title mb-3">
                <v-icon class="section-icon" aria-hidden="true"
                  >mdi-account-circle-outline</v-icon
                >
                <span>Основное</span>
              </div>

              <div class="row-item">
                <span class="label">Имя</span
                ><span class="value">{{ user.name }}</span>
              </div>
              <div class="row-item">
                <span class="label">Телефон</span
                ><span class="value">{{ user.phone }}</span>
              </div>
              <div class="row-item">
                <span class="label">Город</span
                ><span class="value">{{ user.city.title }}</span>
              </div>
              <div class="row-item">
                <span class="label">Роль</span
                ><span class="value">{{ user.role }}</span>
              </div>
              <div class="row-item">
                <span class="label">Заблокирован</span
                ><span class="value">{{ user.isBlocked ? 'Да' : 'Нет' }}</span>
              </div>
            </v-card>
          </v-col>

          <!-- Финансы -->
          <v-col cols="12" md="6">
            <v-card class="user-card pa-4">
              <div class="section-title mb-3">
                <v-icon class="section-icon" aria-hidden="true"
                  >mdi-cash-multiple</v-icon
                >
                <span>Финансы</span>
              </div>

              <div class="row-item">
                <span class="label">Баланс</span
                ><span class="value">{{ user.balance }} ₽</span>
              </div>
              <div class="row-item">
                <span class="label">Кэшбэк, %</span
                ><span class="value">{{ user.cashbackPercent }}%</span>
              </div>
              <div class="row-item">
                <span class="label">Накоплено (всего / операций)</span
                ><span class="value"
                  >{{ user.saveTotal }} ₽ / {{ user.saveCount }}</span
                >
              </div>
              <div class="row-item">
                <span class="label">Потрачено (всего / операций)</span
                ><span class="value"
                  >{{ user.spendTotal }} ₽ / {{ user.spendCount }}</span
                >
              </div>
            </v-card>
          </v-col>

          <!-- Даты -->
          <v-col cols="12" md="6">
            <v-card class="user-card pa-4">
              <div class="section-title mb-3">
                <v-icon class="section-icon" aria-hidden="true"
                  >mdi-calendar-clock</v-icon
                >
                <span>Даты</span>
              </div>

              <div class="row-item">
                <span class="label">Создан</span
                ><span class="value">{{ d(user.createdAt) }}</span>
              </div>
              <div class="row-item">
                <span class="label">Обновлён</span
                ><span class="value">{{ d(user.updatedAt) }}</span>
              </div>
              <div class="row-item">
                <span class="label">Последний визит</span
                ><span class="value">{{ d(user.lastVisit) }}</span>
              </div>
              <div class="row-item">
                <span class="label">Последнее пополнение</span
                ><span class="value">{{ d(user.lastSave) }}</span>
              </div>
              <div class="row-item">
                <span class="label">Последняя покупка</span
                ><span class="value">{{ d(user.lastSpend) }}</span>
              </div>
            </v-card>
          </v-col>

          <!-- Служебное -->
          <v-col cols="12" md="6">
            <v-card class="user-card pa-4">
              <div class="section-title mb-3">
                <v-icon class="section-icon" aria-hidden="true"
                  >mdi-cog-outline</v-icon
                >
                <span>Служебное</span>
              </div>

              <div class="row-item">
                <span class="label">ID</span
                ><span class="value mono">{{ user.id }}</span>
              </div>
              <div class="row-item">
                <span class="label">Город (ID)</span
                ><span class="value mono">{{ user.city.id }}</span>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Отдельная кнопка назад -->
        <div class="back-wrap mt-4">
          <v-btn text small :to="{ path: '/users' }" class="back-btn">
            ← К списку пользователей
          </v-btn>
        </div>
      </v-container>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from '~/plugins/api'
import {
  USERS_TOTAL,
  USERS_FIRST_LIMIT,
  USERS_MAX_LIMIT,
} from '~/constants/users'

export default defineComponent({
  name: 'UserDetailsPage',
  data() {
    return { user: null as User | null }
  },
  fetchOnServer: false,
  async fetch() {
    const id = this.$route.params.id
    if (!id) return

    const cached = (this.$store.state as any).users
    if (cached?.list?.length) {
      this.user = cached.list.find((u: User) => u.id === id) || null
      if (this.user) return
    }

    let offset = 0
    {
      const { items } = await (this as any).$api.users.list({
        offset,
        limit: USERS_FIRST_LIMIT,
      })
      this.user = items.find((u: User) => u.id === id) || null
      if (this.user) return
      offset += items.length
    }
    while (!this.user && offset < USERS_TOTAL) {
      const limit = Math.min(USERS_MAX_LIMIT, USERS_TOTAL - offset)
      const { items } = await (this as any).$api.users.list({ offset, limit })
      this.user = items.find((u: User) => u.id === id) || null
      offset += items.length
    }
  },
  methods: {
    d(ts: number) {
      try {
        return new Date(ts).toLocaleDateString()
      } catch {
        return '-'
      }
    },
  },
})
</script>

<style scoped>
.user-details .h2 {
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}

/* Заголовки секций с иконкой */
.section-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}
.section-icon {
  font-size: 18px;
  opacity: 0.9;
}

/* Карточка */
.user-card {
  border-radius: 10px;
  background: #1b1b1b;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.theme--light .user-card {
  background: #fff;
  border-color: rgba(0, 0, 0, 0.08);
}

/* Ряд "метка — значение" */
.row-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.07);
}
.theme--light .row-item {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
.row-item:last-child {
  border-bottom: 0;
}

.label {
  font-size: 12px;
  line-height: 14px;
  opacity: 0.7;
}
.value {
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
}

/* Кнопка назад отдельно от карточек */
.back-wrap {
  display: flex;
}
.back-btn {
  padding-left: 0;
}
</style>
