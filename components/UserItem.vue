<template>
  <div class="user-card">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="user-line">
          <span class="user-name">{{ name }}</span>
          <span class="user-phone grey--text text--darken-1"> — {{ phone }}</span>
        </div>

        <div class="caption mt-1">
          <a class="city-link" href="javascript:void(0)" @click="$emit('city-click', city.id)">
            {{ city.title }}
          </a>
          · Баланс: {{ balance }} ₽
          · Накоплено: {{ saveTotal }} ₽
          · Потрачено: {{ spendTotal }} ₽
          · Последний визит: {{ formatDate(lastVisit) }}
        </div>
      </v-list-item-content>

      <v-list-item-action>
        <NuxtLink :to="`/users/${id}`">
          <v-btn small outlined class="btn-outline-accent">Детали</v-btn>
        </NuxtLink>
      </v-list-item-action>
    </v-list-item>
  </div>
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
    lastVisit: { type: Number, required: true }
  },
  methods: {
    formatDate (ts: number) {
      return new Date(ts).toLocaleDateString()
    }
  }
})
</script>

<style scoped>
.user-card {
  border-radius: 6px;
  padding: 6px 8px;
  border: 1px solid;
  background: #1b1b1b;
  border-color: rgba(255,255,255,.08);
}
.theme--light .user-card {
  background: #ffffff;
  border-color: rgba(0,0,0,.08);
}

.btn-outline-accent {
  border: 1px solid #FFD166 !important;
  background: transparent !important;
  text-transform: none;
}
:deep(.theme--light) .btn-outline-accent { color: #000 !important; }
:deep(.theme--dark)  .btn-outline-accent { color: #FFD166 !important; }
.btn-outline-accent:hover { background: #FFD166 !important; color: #000 !important; }

/* кликабельный город */
.city-link { text-decoration: none; color: inherit; border-bottom: 1px dashed rgba(0,0,0,.3); }
:deep(.theme--dark) .city-link { border-bottom-color: rgba(255,255,255,.35); }
.city-link:hover { opacity: .85; }

.user-line { font-weight: 700; }
.user-phone { font-weight: 400; }
</style>
