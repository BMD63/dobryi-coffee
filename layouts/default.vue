<template>
  <v-app>
    <app-sidebar />

    <v-app-bar app dense flat clipped-left class="app-bar">
      <!-- КНОПКУ МЕНЮ УДАЛИЛИ -->
      <v-toolbar-title class="font-weight-bold">Добрый кофе</v-toolbar-title>
      <v-spacer />
      <theme-toggle />
    </v-app-bar>

    <v-main class="app-main">
      <v-container class="app-container" fluid>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from '~/components/AppSidebar.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

export default {
  components: { AppSidebar, ThemeToggle }
}
</script>

<style scoped>
.app-container { max-width: 100% !important; }
@media (min-width: 960px) {
  .app-container { max-width: 1280px !important; margin: 0 auto; }
}
.app-main { overflow-x: hidden; }

</style>
