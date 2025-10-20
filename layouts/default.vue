<template>
  <v-app>
    <!-- mini sidebar -->
    <v-navigation-drawer
      app
      permanent
      mini-variant
      :mini-variant-width="72"
    >
      <v-list dense nav>
        <v-list-item disabled>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- top app bar -->
    <v-app-bar app dense flat>
      <v-toolbar-title class="h1">Добрый кофе</v-toolbar-title>
      <v-spacer />
      <v-btn icon :title="themeTitle" @click="toggleTheme">
        <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- page content -->
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    themeTitle () {
      return this.$vuetify.theme.dark ? 'Переключить на светлую' : 'Переключить на тёмную'
    }
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
