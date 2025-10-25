<template>
  <div class="page-stub">
    <v-card class="hero mb-4">
      <div class="hero-content">
        <div class="h1 d-flex align-center">
          <v-icon left class="mr-2">{{ icon }}</v-icon>
          {{ title }}
        </div>
        <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
        <v-alert dense outlined type="info" class="mt-3">
          Раздел в разработке. Здесь будет функционал позже.
        </v-alert>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PageStub',
  props: {
    title: { type: String, required: true },
    icon: { type: String, default: 'mdi-information-outline' },
    subtitle: { type: String, default: '' },
  },
}
</script>

<style scoped>
.hero {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #202020;
}
.theme--light .hero {
  background: #f5f5f5;
  border-color: rgba(0, 0, 0, 0.08);
}
.hero-content {
  padding: 20px 24px;
}
.h1 {
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
  margin: 0 0 4px;
}
.subtitle {
  opacity: 0.8;
}
</style>
