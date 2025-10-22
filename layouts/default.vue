<template>
  <v-app>
    <app-sidebar />

    <v-app-bar app dense flat clipped-left class="app-bar">
      <v-toolbar-title class="font-weight-bold">Добрый кофе</v-toolbar-title>
      <v-spacer />
      <theme-toggle />
    </v-app-bar>
    <v-main class="app-main">
      <v-container class="app-container" fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from '~/components/AppSidebar.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

export default {
  name: 'DefaultLayout',
  components: { AppSidebar },
  computed: { dark () { return this.$vuetify.theme.dark } },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      try { localStorage.setItem('themeDark', String(this.$vuetify.theme.dark)) } catch (e) {}
    }
  },
  mounted () {
    try {
      const saved = localStorage.getItem('themeDark')
      if (saved != null) this.$vuetify.theme.dark = saved === 'true'
    } catch (e) {}
  }
}
</script>

<style scoped>
.app-main.theme--light { background: #EEEEEE; }
.app-main.theme--dark  { background: #121212; }

.app-container {
  max-width: 1100px;
  padding-top: 16px;
  padding-bottom: 32px;
}

.app-bar {
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.theme--dark .app-bar {
  border-bottom: 1px solid rgba(255,255,255,.06);
}
</style>
