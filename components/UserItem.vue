<template>
  <v-list-item class="user-item">
    <v-list-item-content class="py-3">
      <!-- Верхняя строка: имя + телефон + (кнопка на md+) -->
      <div class="user-item__header">
        <div class="user-item__title">
          <span class="user-name">{{ name }}</span>
          <span class="sep">—</span>
          <span class="user-phone">{{ phone }}</span>
        </div>

        <!-- Кнопка (только md и шире) -->
        <div class="user-item__actions d-none d-sm-flex">
          <v-btn
            small
            outlined
            class="btn-details"
            :to="`/users/${id}`"
          >
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
        <span class="city">{{ city.title }}</span>
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
    lastVisit: { type: Number, required: true }
  },
  methods: {
    formatDate (ts) {
      try {
        return new Date(ts).toLocaleDateString()
      } catch (e) {
        return '-'
      }
    }
  }
}
</script>

<style scoped>
.user-item {
  border-bottom: 1px solid rgba(255,255,255,.06);
  overflow: hidden;
}
.theme--light .user-item { border-bottom-color: rgba(0,0,0,.08); }

/* Шапка */
.user-item__header { display:flex; align-items:center; gap:12px; }
.user-item__title {
  flex: 1 1 0; min-width:0;
  display:flex; align-items:baseline; flex-wrap:wrap; gap:6px;
}
.user-name{ font-weight:700; font-size:16px; line-height:20px; max-width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sep{ opacity:.6; }
.user-phone{ opacity:.85; }

.user-item__actions{ flex:0 1 auto; min-width:0; }

/* Метрики */
.user-item__metrics{
  display:grid;
  grid-template-columns:repeat(4,auto);
  gap:12px 24px;
  margin-top:6px;
}
.metric{ display:flex; gap:6px; align-items:baseline; }
.metric__label{ opacity:.7; }
.metric__value{ font-weight:700; }
.metric--date .metric__value{ white-space:nowrap; }

/* Город */
.user-item__city{ display:flex; align-items:center; margin-top:6px; opacity:.9; }

/* ===== Кнопка «Детали» ===== */
.btn-details {
  border-color: #FFD166 !important;
  color: #FFD166 !important;
  background: transparent !important;
  box-shadow: none !important;
}
/* покрасить и внутренний контент */
.btn-details :deep(.v-btn__content) {
  color: #FFD166 !important;
}

/* компактная xs-версия */
.btn-details--xs {
  min-height: 32px !important;
  padding: 0 12px !important;
  font-size: 12px !important;
  letter-spacing: .02em;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
}

.btn-details--block { width: 100%; }
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

/* ===== Мобильная адаптация ===== */
@media (max-width: 599px) {
  .user-item__actions{ display:none !important; }
  .user-item__header{ align-items:flex-start; }
  .user-item__metrics{ grid-template-columns:1fr 1fr; gap:8px 16px; }

  .btn-details--block{
    display:block;
    width:100%;
    max-width:100%;
    box-sizing:border-box;
    overflow:hidden;
    text-overflow:ellipsis;
  }
}

@media (max-width: 360px) {
  .btn-details--xs{
    padding:0 10px !important;
    font-size:11px !important;
  }
  .user-item__metrics{ grid-template-columns:1fr; }
}
</style>
