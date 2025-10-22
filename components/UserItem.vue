<template>
  <v-card class="user-card">
    <div class="content">
      <div class="title-line">
        <span class="name">{{ name }}</span>
        <span class="phone">&nbsp;—&nbsp;{{ phone }}</span>
      </div>

      <div class="meta caption">
        <a href="#" class="city" @click.prevent="$emit('city-click', city.id)">{{ city.title }}</a>
        · Баланс: {{ money(balance) }}
        · Накоплено: {{ money(saveTotal) }}
        · Потрачено: {{ money(spendTotal) }}
        · Последний визит: {{ formatDate(lastVisit) }}
      </div>

      <div class="action-mobile d-flex d-sm-none">
        <v-btn
          :to="`/users/${id}`"
          outlined
          small
          block
          color="accent"
          class="btn-details mt-2"
        >
          Детали
        </v-btn>
      </div>
    </div>

    <div class="action d-none d-sm-flex">
      <v-btn
        :to="`/users/${id}`"
        outlined
        small
        color="accent"
        class="btn-details"
      >
        Детали
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
type City = { id: string; title: string }

export default defineComponent({
  name: 'UserItem',
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: Object as PropType<City>, required: true },
    balance: { type: Number, required: true },
    saveTotal: { type: Number, required: true },
    spendTotal: { type: Number, required: true },
    lastVisit: { type: Number, required: true }
  },
  methods: {
    money (n: number) { return `${n} ₽` },
    formatDate (ts: number) { return new Date(ts).toLocaleDateString() }
  }
})
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.06);
  background: #202020;
}
.theme--light .user-card {
  background: #F5F5F5;
  border-color: rgba(0,0,0,.08);
}

/* контент */
.content { min-width: 0; flex: 1; }
.title-line { font-weight: 700; color: inherit; }
.name { color: inherit; }
.phone { opacity: .85; }

/* мета */
.meta { color: inherit; opacity: .9; }
.city { text-decoration: none; border-bottom: 1px dotted currentColor; }
.city:hover { opacity: .9; }

/* действия */
.action { margin-left: 16px; }
.btn-details { border-width: 2px; }

/* на очень узких чутка ужимаем внутренние поля */
@media (max-width: 360px) {
  .user-card { padding-left: 10px; padding-right: 10px; }
}
</style>
