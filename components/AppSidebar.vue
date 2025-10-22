<template>
  <div>
    <v-navigation-drawer
      v-if="!isMobile"
      v-model="drawer"
      app
      clipped
      :width="260"
      :mini-variant="mini"
      :mini-variant-width="72"
      class="app-sidebar"
    >
      <div class="sidebar-header" :class="{ mini }">
        <v-btn icon class="avatar-btn" @click="mini = !mini" :title="mini ? 'Развернуть' : 'Свернуть'">
          <div class="avatar"><v-icon large>mdi-account</v-icon></div>
        </v-btn>

        <div v-if="!mini" class="user-block">
          <div class="user-name">Михаил Макеев</div>
        </div>

        <v-btn v-if="!mini" icon class="toggle-btn" @click="mini = !mini" title="Свернуть">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>

      <v-divider />

      <v-list nav dense class="py-2">
        <v-list-item
          v-for="it in items"
          :key="it.to"
          :to="it.to"
          link
          :exact="!it.startsWith"
          active-class="is-active"
          class="nav-item"
        >
          <v-list-item-icon class="mr-0"><v-icon>{{ it.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-list-item-title>{{ it.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-else
      app
      clipped
      stateless
      disable-route-watcher
      touchless
      :value="true"
      :mini-variant="true"
      :width="72"
      :mini-variant-width="72"
      class="app-sidebar app-sidebar--rail"
    >
      <div class="sidebar-header mini">
        <v-btn icon class="avatar-btn" @click="mobileOpen = true" title="Меню">
          <div class="avatar"><v-icon large>mdi-account</v-icon></div>
        </v-btn>
      </div>

      <v-divider />

      <v-list nav dense class="py-2">
        <v-list-item
          v-for="it in items"
          :key="it.to"
          :to="it.to"
          link
          :exact="!it.startsWith"
          active-class="is-active"
          class="nav-item"
          @click="mobileOpen = true"
        >
          <v-list-item-icon class="mr-0"><v-icon>{{ it.icon }}</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="isMobile"
      v-model="mobileOpen"
      app
      clipped
      temporary
      :width="260"
      class="app-sidebar app-sidebar--overlay"
    >
      <div class="sidebar-header">
        <v-btn icon class="avatar-btn" @click="mobileOpen = false" title="Закрыть">
          <div class="avatar"><v-icon large>mdi-account</v-icon></div>
        </v-btn>
        <div class="user-block">
          <div class="user-name">Михаил Макеев</div>
        </div>
        <v-btn icon class="toggle-btn" @click="mobileOpen = false"><v-icon>mdi-chevron-left</v-icon></v-btn>
      </div>

      <v-divider />

      <v-list nav dense class="py-2">
        <v-list-item
          v-for="it in items"
          :key="it.to"
          :to="it.to"
          link
          :exact="!it.startsWith"
          active-class="is-active"
          class="nav-item"
          @click="onNavigateMobile"
        >
          <v-list-item-icon class="mr-0"><v-icon>{{ it.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ it.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { MENU_ITEMS } from '~/constants/menu'

export default {
  name: 'AppSidebar',
  data () {
    return {
      drawer: true,   // desktop открыт
      mini: true      // desktop mini
    }
  },
  computed: {
    items () { return MENU_ITEMS },
    isMobile () {
      const bp = this.$vuetify && this.$vuetify.breakpoint
      return !!(bp && bp.smAndDown)
    },
    mobileOpen: {
      get () {
        const s = this.$store && this.$store.state && this.$store.state.ui
        return !!(s && s.mobileMenuOpen)
      },
      set (v) {
        if (this.$store) this.$store.commit('ui/setMobileMenuOpen', !!v)
      }
    }
  },
  watch: {
    mobileOpen (v) {
      if (process.client) document.documentElement.style.overflow = v ? 'hidden' : ''
    }
  },
  beforeDestroy () {
    if (process.client) document.documentElement.style.overflow = ''
  },
  methods: {
    onNavigateMobile () { this.mobileOpen = false }
  }
}
</script>

<style scoped>
.app-sidebar.theme--light { background: #ffffff; border-right: 1px solid rgba(0,0,0,.08); }
.app-sidebar.theme--dark  { background: #1A1A1A; border-right: 1px solid rgba(255,255,255,.06); }

/* scrim overlay */
:deep(.v-navigation-drawer__scrim) { background-color: rgba(0,0,0,.5) !important; }

/* header */
.sidebar-header { display:flex; align-items:center; height:56px; padding:0 8px 0 12px; }
.sidebar-header.mini { justify-content:center; }

.avatar-btn { padding:0; min-width:0; }
.avatar {
  width:40px; height:40px; border-radius:10px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.06);
}
.theme--dark .avatar { background:rgba(255,255,255,.08); }

.user-block { margin-left:12px; min-width:0; flex:1 1 auto; }
.user-name { font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.user-sub  { font-size:12px; opacity:.7; }
.toggle-btn { margin-left:auto; }

/* пункты меню */
.nav-item { margin:6px 8px; border-radius:12px; height:44px; padding:0 12px; }
.nav-item .v-icon { font-size:22px; }

/* hover */
.theme--light .nav-item:not(.is-active):hover { background:rgba(0,0,0,.06); }
.theme--dark  .nav-item:not(.is-active):hover { background:rgba(255,255,255,.08); }

/* активный пункт */
.theme--dark  .is-active { background:#3A3A3A !important; color:#fff !important; }
.theme--light .is-active { background:#EAEAEA !important; color:#000 !important; }

/* слои */
.app-sidebar--rail { z-index: 201; }
.app-sidebar--overlay { z-index: 202; }
</style>
