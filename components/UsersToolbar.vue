<template>
  <div class="users-toolbar">
    <!-- Верхняя строка подписей -->
    <v-row no-gutters class="mb-1">
      <v-col cols="12" md="6" class="pr-md-2">
        <div class="caption">
          <template v-if="hasTotals">
            Найдено: <strong>{{ total }}</strong>
            <template v-if="hasPages">
              · Страница {{ page }} из {{ pages }}
            </template>
          </template>
          <template v-else>&nbsp;</template>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="pl-md-2 mt-1 mt-md-0">
        <div class="caption">
          <template v-if="selectedList.length === 0">
            Города не выбраны
          </template>
          <template v-else>
            Выбрано городов: <strong>{{ selectedList.length }}</strong>
          </template>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="d-none d-md-flex mb-2">
      <v-col md="6" class="pr-md-2"><!-- место под левую колонку --></v-col>
      <v-col md="6" class="pl-md-2">
        <div class="chips-row">
          <template v-if="selectedList.length">
            <v-chip
              v-for="c in firstChips"
              :key="c.id"
              small
              close
              class="chip"
              @click:close="removeCity(c.id)"
              :aria-label="`Убрать город: ${c.title}`"
            >
              {{ c.title }}
            </v-chip>
            <v-chip
              v-if="restCount > 0"
              small
              outlined
              class="chip chip-muted"
              :ripple="false"
              :tabindex="-1"
            >
              + ещё {{ restCount }}
            </v-chip>
          </template>
        </div>
      </v-col>
    </v-row>

    <!-- Поля -->
    <v-row no-gutters>
      <!-- Поиск -->
      <v-col cols="12" md="6" class="pr-md-2">
        <v-text-field
          class="field"
          :value="searchProxy"
          @input="searchProxy = $event"
          prepend-inner-icon="mdi-magnify"
          hide-details
          outlined
          dense
          placeholder="По имени или телефону"
        />
      </v-col>

      <v-col cols="12" class="d-md-none">
        <div class="chips-row mb-2">
          <template v-if="selectedList.length">
            <v-chip
              v-for="c in firstChips"
              :key="c.id"
              small
              close
              class="chip"
              @click:close="removeCity(c.id)"
              :aria-label="`Убрать город: ${c.title}`"
            >
              {{ c.title }}
            </v-chip>
            <v-chip
              v-if="restCount > 0"
              small
              outlined
              class="chip chip-muted"
              :ripple="false"
              :tabindex="-1"
            >
              + ещё {{ restCount }}
            </v-chip>
          </template>
        </div>
      </v-col>

      <!-- Селект городов -->
      <v-col cols="12" md="6" class="pl-md-2">
        <v-select
          class="field"
          :items="cities"
          :value="citiesProxy"
          @change="citiesProxy = $event"
          item-text="title"
          item-value="id"
          multiple
          outlined
          dense
          hide-details
          placeholder="Фильтр по городам"
          :menu-props="{ offsetY: true }"
        >
          <template #selection>
            <span v-if="selectedList.length === 0" class="caption">Не выбрано</span>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type City = { id: string; title: string }

export default Vue.extend({
  name: 'UsersToolbar',
  props: {
    cities: { type: Array as () => City[], required: true },
    valueSearch: { type: String, default: '' },
    valueCities: { type: Array as () => string[], default: () => [] },
    total: { type: Number, default: null },
    page:  { type: Number, default: 1 },
    pages: { type: Number, default: 1 }
  },

  computed: {
    hasTotals(): boolean { return this.total !== null && this.total !== undefined },
    hasPages(): boolean { return !!this.pages && !!this.page },

    searchProxy: {
      get(): string { return (this as any).valueSearch },
      set(v: string) { (this as any).$emit('update:search', v) }
    },

    citiesProxy: {
      get(): string[] { return (this as any).valueCities },
      set(v: string[]) { (this as any).$emit('update:cities', v) }
    },

    selectedList(): City[] {
      const chosen = new Set((this as any).valueCities as string[])
      return ((this as any).cities as City[]).filter(c => chosen.has(c.id))
    },

    firstChips(): City[] { return (this as any).selectedList.slice(0, 3) },

    restCount(): number {
      const total = ((this as any).selectedList as City[]).length
      return Math.max(0, total - 3)
    }
  },

  methods: {
    removeCity(id: string) {
      const next = ((this as any).valueCities as string[]).filter(x => x !== id)
      ;(this as any).$emit('update:cities', next)
    }
  }
})
</script>

<style scoped>
.field { width: 100%; }

/* Чипы */
.chips-row {
  min-height: 34px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.chips-row .chip { border-radius: 12px; }
.chips-row .chip-muted { pointer-events: none; opacity: .85; }
</style>
