<template>
  <v-list-item class="user-item">
    <v-list-item-content class="py-3">
      <div class="user-item__header">
        <div class="user-item__title">
          <span class="user-name">{{ name }}</span>
          <span class="sep">—</span>
          <span class="user-phone">{{ phone }}</span>
        </div>

        <div class="user-item__actions d-none d-sm-flex">
          <v-btn small outlined class="btn-details" :to="`/users/${id}`">
            Детали
          </v-btn>
        </div>
      </div>

      <!-- Вторая строка: метрики -->
      <div class="user-item__metrics">
        <div class="metric">
          <span class="metric__label">Баланс</span>
          <span class="metric__value">{{ balance }} ₽</span>
        </div>
        <div class="metric">
          <span class="metric__label">Накоплено</span>
          <span class="metric__value">{{ saveTotal }} ₽</span>
        </div>
        <div class="metric">
          <span class="metric__label">Потрачено</span>
          <span class="metric__value">{{ spendTotal }} ₽</span>
        </div>
        <div class="metric metric--date">
          <span class="metric__label">Последний визит</span>
          <span class="metric__value">{{ formatDate(lastVisit) }}</span>
        </div>
      </div>

      <!-- Город -->
      <div class="user-item__city">
        <v-icon small class="mr-2">mdi-map-marker</v-icon>
        <button
          class="city-link"
          type="button"
          @click="$emit('city-click', city.id)"
        >
          {{ city.title }}
        </button>
      </div>

      <div class="d-flex d-sm-none mt-2">
        <v-btn
          small
          outlined
          class="btn-details btn-details--xs btn-details--block"
          :to="`/users/${id}`"
        >
          Детали
        </v-btn>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: Object, required: true },
    balance: { type: Number, required: true },
    saveTotal: { type: Number, required: true },
    spendTotal: { type: Number, required: true },
    lastVisit: { type: Number, required: true },
  },
  methods: {
    formatDate(ts) {
      try {
        return new Date(ts).toLocaleDateString()
      } catch (e) {
        return '-'
      }
    },
  },
}
</script>

<style scoped>
.theme--light {
  --card-bg: #f4f4f4;
}
.theme--dark {
  --card-bg: #1e1e1e;
}

/* ===== Карточка ===== */
.user-item {
  background: var(--card-bg);
  border-radius: 8px;

  overflow: hidden;
}

.user-item :deep(.v-list-item)::before,
.user-item :deep(.v-list-item)::after {
  content: none;
  display: none;
}

.user-item :deep(.v-list-item__content) {
  padding-left: 12px;
  padding-right: 12px;
}

/* Шапка */
.user-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-item__title {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
}
.user-name {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sep {
  opacity: 0.6;
}
.user-phone {
  opacity: 0.85;
}
.user-item__actions {
  flex: 0 1 auto;
  min-width: 0;
}

/* Метрики */
.user-item__metrics {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 12px 24px;
  margin-top: 6px;
}
.metric {
  display: flex;
  gap: 6px;
  align-items: baseline;
}
.metric__label {
  opacity: 0.7;
}
.metric__value {
  font-weight: 700;
}
.metric--date .metric__value {
  white-space: nowrap;
}

/* Город */
.user-item__city {
  display: flex;
  align-items: center;
  margin-top: 6px;
  opacity: 0.9;
}

/* Кнопка «Детали» */
.btn-details--xs {
  min-height: 32px;
  padding: 0 12px;
  font-size: 12px;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn-details--block :deep(.v-btn__content) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 599px) {
  .user-item__actions {
    display: none !important;
  }
  .user-item__header {
    align-items: flex-start;
  }
  .user-item__metrics {
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
  }
  .btn-details--block {
    display: inline-flex;
    width: 100%;
    max-width: 100%;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-details--xs {
    min-height: 32px !important;
    padding: 0 12px !important;
    font-size: 12px !important;
    letter-spacing: 0.02em;
  }
}
@media (max-width: 360px) {
  .btn-details--xs {
    padding: 0 10px !important;
    font-size: 11px !important;
  }
  .user-item__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
