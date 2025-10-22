<template>
  <div class="mb-4">
    <!-- поля выровнены по нижнему краю -->
    <v-row dense align="end">
      <!-- Поиск -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchLocal"
          label="Поиск по имени или телефону"
          prepend-inner-icon="mdi-magnify"
          clearable
          dense
          single-line
          hide-details
          @input="$emit('update:search', searchLocal)"
        />
      </v-col>

      <!-- Фильтр по городам -->
      <v-col cols="12" md="6">
        <!-- стабильная полоса под чипы (фиксированная высота) -->
        <div class="chips-row">
          <template v-if="selectedIds.length">
            <v-chip
              v-for="c in chipTitles.slice(0, 3)"
              :key="c.id"
              small
              class="mr-1"
              close
              @click:close="toggleCity(c.id)"
            >
              {{ c.title }}
            </v-chip>
            <span v-if="selectedIds.length > 3" class="caption ml-1">
              +{{ selectedIds.length - 3 }}
            </span>
          </template>
        </div>

        <v-menu
          v-model="menu"
          offset-y
          :close-on-content-click="false"
          max-width="420"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              readonly
              :value="selectedLabel"
              placeholder="Фильтр по городам"
              append-icon="mdi-menu-down"
              dense
              single-line
              hide-details
              @click:append="menu = !menu"
            />
          </template>

          <v-card class="users-toolbar__card">
            <div class="px-4 pt-3 caption">Выбрано: {{ selectedIds.length }}</div>

            <v-list dense class="users-toolbar__menu">
              <v-list-item
                v-for="c in cities"
                :key="c.id"
                @click="toggleCity(c.id)"
              >
                <v-list-item-action>
                  <v-icon>
                    {{ isSelected(c.id) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ c.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />
            <div class="users-toolbar__actions">
              <v-btn text small @click="clearAll">Сбросить</v-btn>
              <v-btn small class="btn-done ml-2" @click="menu = false">Готово</v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'UsersToolbar',
  props: {
    cities: { type: Array, default: () => [] },        // [{ id, title }]
    valueSearch: { type: String, default: '' },
    valueCities: { type: Array, default: () => [] }    // [id, id, ...]
  },
  data () {
    return {
      searchLocal: '',
      selectedIds: [],
      menu: false
    }
  },
  computed: {
    // строка в поле: 1 — название, 2..3 — перечисление, >3 — первые 2 + "+N"
    selectedLabel () {
      const ids = this.selectedIds
      const n = ids.length
      if (!n) return ''
      const titles = this.cities.filter(c => ids.includes(c.id)).map(c => c.title)
      if (n === 1) return titles[0]
      if (n <= 3) return titles.join(', ')
      return `${titles.slice(0, 2).join(', ')} +${n - 2}`
    },
    // данные для чипов сверху (макс. 3 показываем)
    chipTitles () {
      const set = new Set(this.selectedIds)
      return this.cities.filter(c => set.has(c.id))
    }
  },
  watch: {
    valueSearch: { immediate: true, handler (v) { this.searchLocal = v } },
    valueCities: {
      immediate: true,
      handler (ids) { this.selectedIds = Array.isArray(ids) ? ids.slice() : [] }
    }
  },
  methods: {
    isSelected (id) { return this.selectedIds.includes(id) },
    toggleCity (id) {
      const idx = this.selectedIds.indexOf(id)
      this.selectedIds = idx === -1
        ? this.selectedIds.concat(id)
        : [...this.selectedIds.slice(0, idx), ...this.selectedIds.slice(idx + 1)]
      this.$emit('update:cities', this.selectedIds.slice())
    },
    clearAll () {
      this.selectedIds = []
      this.$emit('update:cities', [])
    }
  }
}
</script>

<style scoped>
.chips-row {
  min-height: 28px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.users-toolbar__card { width: 420px; }
.users-toolbar__menu {
  width: 420px;
  max-height: 420px;
  overflow: auto;
}
.users-toolbar__actions {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
}

.btn-done { background-color: #FFD166 !important; color: #000 !important; }

.city-menu { max-width: 420px; width: 100%; }
:deep(.v-menu__content) { max-width: 100% !important; }
</style>
