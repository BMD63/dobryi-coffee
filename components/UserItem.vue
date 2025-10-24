<template>
  <div class="user-card">
    <div class="d-flex align-center flex-wrap" style="min-width:0;">
      <div class="mr-4" style="min-width:0;">
        <div class="h1 truncate">{{ name }}</div>
        <div class="caption mt-1">{{ phone }}</div>
        <div class="mt-1">
          <v-btn
            text small class="px-0"
            @click="$emit('city-click', city.id)"
            :aria-label="`Фильтровать по городу: ${city.title}`"
          >
            <v-icon left small class="mr-1">mdi-map-marker</v-icon>{{ city.title }}
          </v-btn>
        </div>
      </div>

      <div class="d-none d-sm-flex align-center flex-wrap">
        <div class="mr-5">
          <div class="caption">Баланс</div>
          <div class="font-weight-bold">{{ money(balance) }}</div>
        </div>
        <div class="mr-5">
          <div class="caption">Накоплено</div>
          <div class="font-weight-bold">{{ money(saveTotal) }}</div>
        </div>
        <div class="mr-5">
          <div class="caption">Потрачено</div>
          <div class="font-weight-bold">{{ money(spendTotal) }}</div>
        </div>
        <div>
          <div class="caption">Последний визит</div>
          <div class="font-weight-bold">{{ dt(lastVisit) }}</div>
        </div>
      </div>
    </div>

    <div class="d-none d-sm-flex">
      <v-btn
        :to="`/users/${id}`"
        outlined
        small
        class="btn-accent-outlined"
        aria-label="Открыть детали пользователя"
      >
        Детали
      </v-btn>
    </div>

    <div class="d-sm-none" style="width:100%; margin-top:8px;">
      <div class="d-flex align-center justify-space-between">
        <div>
          <div class="caption">Баланс</div>
          <div class="font-weight-bold">{{ money(balance) }}</div>
        </div>
        <div>
          <div class="caption">Накоплено</div>
          <div class="font-weight-bold">{{ money(saveTotal) }}</div>
        </div>
        <div>
          <div class="caption">Потрачено</div>
          <div class="font-weight-bold">{{ money(spendTotal) }}</div>
        </div>
      </div>
      <div class="caption mt-2">Последний визит: <strong>{{ dt(lastVisit) }}</strong></div>

      <v-btn
        :to="`/users/${id}`"
        outlined
        small
        block
        class="btn-accent-outlined mt-3"
        aria-label="Открыть детали пользователя"
      >
        Детали
      </v-btn>
    </div>
  </div>
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
    money (n: number): string {
      try {
        return new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
      } catch {
        return `${n} ₽`
      }
    },
    dt (ts: number): string {
      if (!ts) return '—'
      try {
        return new Date(ts).toLocaleDateString('ru-RU')
      } catch {
        return '—'
      }
    }
  }
})
</script>
