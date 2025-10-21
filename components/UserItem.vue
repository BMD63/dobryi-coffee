<template>
  <v-list-item class="user-item">
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">
        {{ name }} — {{ phone }}
      </v-list-item-title>

      <v-list-item-subtitle class="caption">
        <v-btn text small class="pa-0 mr-2 city-link" @click="$emit('city-click', city.id)">
          {{ city.title }}
        </v-btn>
        · Баланс: {{ balance }} ₽
        · Накоплено: {{ saveTotal }} ₽
        · Потрачено: {{ spendTotal }} ₽
        · Последний визит: {{ formatDate(lastVisit) }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <NuxtLink :to="`/users/${id}`">
        <v-btn small class="btn-accent">Детали</v-btn>
      </NuxtLink>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'UserItem',
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: Object as PropType<{ id: string; title: string }>, required: true },
    balance: { type: Number, required: true },
    saveTotal: { type: Number, required: true },
    spendTotal: { type: Number, required: true },
    lastVisit: { type: Number, required: true },
  },
  methods: {
    formatDate (ts: number) {
      return new Date(ts).toLocaleDateString()
    }
  }
})
</script>

<style scoped>
.user-item { border-bottom: 1px solid rgba(0,0,0,.06); }
.city-link { text-transform: none; }
.btn-accent {
  background-color: #FFD166 !important;
  color: #000 !important;
}
</style>
