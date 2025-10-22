<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    permanent
    clipped
    :mini-variant="mini"
    :width="260"
    :mini-variant-width="72"
    elevation="1"
    class="app-sidebar"
  >
    <!-- Шапка сайдбара -->
    <div class="sidebar-header" :class="{ mini }">
      <v-tooltip right>
        <template #activator="{ on, attrs }">
          <v-btn icon class="avatar-btn" v-bind="attrs" v-on="on" @click="toggle">
            <div class="avatar"><v-icon large>mdi-account</v-icon></div>
          </v-btn>
        </template>
        <span>{{ mini ? 'Развернуть' : 'Свернуть' }}</span>
      </v-tooltip>

      <div v-if="!mini" class="user-block">
        <div class="user-name">Михаил Макеев</div>
        <div class="user-sub">CRM</div>
      </div>

      <v-btn v-if="!mini" icon class="toggle-btn" @click="toggle" title="Свернуть">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </div>

    <v-divider />

    <!-- Меню -->
    <v-list nav dense class="py-2">
      <NuxtLink
        v-for="it in items"
        :key="it.to"
        :to="it.to"
        class="nuxt-link--no-style"
      >
        <v-list-item :class="['nav-item', isActive(it) && 'is-active']">
          <v-list-item-icon class="mr-0">
            <v-icon>{{ it.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-list-item-title>{{ it.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
    </v-list>

    <v-spacer />
    <v-divider />
  </v-navigation-drawer>
</template>

<script>
import { MENU_ITEMS } from '~/constants/menu'

export default {
  name: 'AppSidebar',
  data () {
    return {
      drawer: true,
      mini: true // collapsed по умолчанию
    }
  },
  computed: {
    items () { return MENU_ITEMS }
  },
  methods: {
  isActive (it) {
    const path = this.$route.path
    if (it.startsWith) {
      return path === it.to || path.startsWith(it.to + '/')
    }
    return path === it.to
  },
  toggle () { this.mini = !this.mini }
}
}
</script>

<style scoped>
.nuxt-link--no-style { text-decoration: none; color: inherit; }

.app-sidebar.theme--light { background: #ffffff; border-right: 1px solid rgba(0,0,0,.08); }
.app-sidebar.theme--dark  { background: #1A1A1A; border-right: 1px solid rgba(255,255,255,.06); }

/* Шапка */
.sidebar-header {
  display: flex; align-items: center; height: 56px;
  padding: 0 8px 0 12px;
}
.sidebar-header.mini { justify-content: center; }
.avatar-btn { padding: 0; min-width: 0; }
.avatar {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.06);
}
.theme--dark .avatar { background: rgba(255,255,255,.08); }

.user-block { margin-left: 12px; min-width: 0; flex: 1 1 auto; }
.user-name  { font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-sub   { font-size: 12px; opacity: .7; }

.toggle-btn { margin-left: auto; }

/* Пункты меню */
.nav-item {
  margin: 6px 8px; border-radius: 12px; height: 44px; padding: 0 12px;
}
.nav-item .v-icon { font-size: 22px; }

.theme--light .nav-item:not(.is-active):hover { background: rgba(0,0,0,.06); }
.theme--dark  .nav-item:not(.is-active):hover { background: rgba(255,255,255,.08); }

.theme--dark  .nav-item.is-active  { background: #3A3A3A !important; color: #FFFFFF !important; }
.theme--light .nav-item.is-active  { background: #EAEAEA !important; color: #000000 !important; }
</style>

