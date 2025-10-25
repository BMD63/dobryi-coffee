<template>
  <button
    class="theme-toggle"
    :class="{ dark }"
    :aria-checked="String(dark)"
    role="switch"
    aria-label="Переключить тему"
    title="Переключить тему"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <span class="track" aria-hidden="true"></span>
    <span class="thumb" aria-hidden="true">
      <v-icon v-if="dark" small>mdi-white-balance-sunny</v-icon>
      <v-icon v-else small>mdi-moon-waning-crescent</v-icon>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  computed: {
    dark() {
      return this.$vuetify.theme.dark
    },
  },
  methods: {
    toggle() {
      const next = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = next
      try {
        localStorage.setItem('themeDark', String(next))
      } catch (_) {}
    },
  },
  mounted() {
    try {
      const saved = localStorage.getItem('themeDark')
      if (saved != null) {
        this.$vuetify.theme.dark = saved === 'true'
        return
      }
    } catch (_) {}

    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      this.$vuetify.theme.dark = !!prefersDark
    }
  },
}
</script>

<style scoped>
/* размеры и клик-зона */
.theme-toggle {
  position: relative;
  width: 64px;
  height: 32px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  border-radius: 999px;
  transition: box-shadow var(--dur-2, 240ms) var(--ease, ease);
}

.theme-toggle:focus-visible {
  box-shadow: 0 0 0 2px var(--color-accent);
}

/* ===== ТРЕК ===== */
.theme-toggle .track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95),
    rgba(230, 230, 230, 0.95)
  );
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color var(--dur-2, 240ms) var(--ease, ease),
    box-shadow var(--dur-2, 240ms) var(--ease, ease);
}

.theme-toggle.dark .track {
  background: linear-gradient(180deg, #343441, #2a2a34);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 10px 18px rgba(0, 0, 0, 0.45);
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
  transition: left var(--dur-2, 240ms) var(--ease, ease),
    transform var(--dur-1, 140ms) var(--ease, ease),
    background-color var(--dur-2, 240ms) var(--ease, ease),
    box-shadow var(--dur-2, 240ms) var(--ease, ease),
    color var(--dur-2, 240ms) var(--ease, ease);
  will-change: left, transform, box-shadow;
}

.theme-toggle:not(.dark) .thumb {
  left: calc(100% - 28px - 4px);
  background: #ffffff;
  color: #000;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
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

.theme-toggle:hover .thumb {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.theme-toggle.dark:hover .thumb {
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-toggle * {
    transition: none !important;
  }
}
</style>
