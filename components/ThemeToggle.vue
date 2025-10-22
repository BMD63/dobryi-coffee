<template>
  <button class="theme-toggle" :class="{ dark }" @click="toggle" aria-label="Переключить тему">
    <span class="track"></span>
    <span class="thumb">
      <!-- в dark показываем солнце, в light — луну -->
      <v-icon v-if="dark" small>mdi-white-balance-sunny</v-icon>
      <v-icon v-else small>mdi-moon-waning-crescent</v-icon>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  computed: {
    dark () { return this.$vuetify.theme.dark }
  },
  methods: {
    toggle () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      try { localStorage.setItem('themeDark', String(this.$vuetify.theme.dark)) } catch (_) {}
    }
  },
  mounted () {
    try {
      const saved = localStorage.getItem('themeDark')
      if (saved != null) this.$vuetify.theme.dark = saved === 'true'
    } catch (_) {}
  }
}
</script>

<style scoped>
/* общий контейнер тумблера */
.theme-toggle {
  position: relative;
  width: 64px;
  height: 32px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
}

/* ===== ТРЕК ===== */
.theme-toggle .track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,.95), rgba(230,230,230,.95));
  box-shadow: inset 0 2px 6px rgba(0,0,0,.15);
}

.theme-toggle.dark .track {
  background: linear-gradient(180deg, #343441, #2a2a34);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    inset 0 10px 18px rgba(0,0,0,.45);
}

/* ===== БЕГУНОК ===== */
.theme-toggle .thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: left .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease;
}

.theme-toggle:not(.dark) .thumb {
  left: calc(100% - 28px - 4px);
  background: #ffffff;
  color: #000;
  box-shadow: 0 3px 10px rgba(0,0,0,.25);
}
.theme-toggle:not(.dark) .thumb :deep(.v-icon) {
  font-size: 18px;
}

.theme-toggle.dark .thumb {
  left: 6px;
  background: transparent;
  color: #ffffff;
  box-shadow: none;
}
.theme-toggle.dark .thumb :deep(.v-icon) {
  font-size: 20px;
}

/* ховер */
.theme-toggle:hover .thumb {
  box-shadow: 0 4px 12px rgba(0,0,0,.3);
}
.theme-toggle.dark:hover .thumb { box-shadow: none; }
</style>
