<template>
  <div>
    <div class="h1 mb-4">Пользователи</div>

    <!-- skeleton на время загрузки fetch -->
    <div v-if="$fetchState.pending">
      <v-skeleton-loader
        type="list-item, list-item, list-item, list-item, list-item"
        class="mb-3"
      />
    </div>

    <div v-else>
      <div class="caption mb-2">Тут позже появится список и фильтры</div>
      <v-alert type="info" outlined>
        Заглушка страницы <code>/users</code>. Данные пока не загружаем.
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  async fetch () {
    await new Promise(r => setTimeout(r, 600))
  },
  fetchOnServer: false
}
</script>
