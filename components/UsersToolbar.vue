<template>
  <div class="users-toolbar">
    <v-row no-gutters class="d-none d-md-flex mb-2">
      <v-col md="6" offset-md="6" class="pl-md-3">
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
          <span v-else class="caption chips-placeholder">Города не выбраны</span>
        </div>
      </v-col>
    </v-row>

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

      <v-col cols="12" class="d-flex d-md-none">
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
          <span v-else class="caption chips-placeholder">Города не выбраны</span>
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
    valueCities: { type: Array as () => string[], default: () => [] }
  },

  computed: {
    searchProxy: {
      get(): string {
        return (this as any).valueSearch
      },
      set(v: string) {
        (this as any).$emit('update:search', v)
      }
    },

    citiesProxy: {
      get(): string[] {
        return (this as any).valueCities
      },
      set(v: string[]) {
        (this as any).$emit('update:cities', v)
      }
    },

    selectedList(): City[] {
      const chosen = new Set((this as any).valueCities as string[])
      return ((this as any).cities as City[]).filter(c => chosen.has(c.id))
    },

    // максимум 3 чипа
    firstChips(): City[] {
      return (this as any).selectedList.slice(0, 3)
    },

    // «+ ещё N»
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
.chips-row {
  min-height: 36px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.chips-row .chip { border-radius: 12px; }
.chips-row .chip-muted { pointer-events: none; opacity: .85; }
.chips-row .chips-placeholder { opacity: .6; }

.field { width: 100%; }
</style>
