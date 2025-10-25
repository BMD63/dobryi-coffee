<template>
  <div class="home-page">
    <!-- Hero -->
    <v-card class="hero mb-4">
      <div class="hero-content">
        <div class="h1">Добро пожаловать</div>
        <div class="subtitle">Выберите раздел для работы</div>
        <div class="actions">
          <v-btn color="accent" outlined class="mr-2" to="/users"
            >Пользователи</v-btn
          >
        </div>
      </div>
    </v-card>

    <!-- Плитки разделов (пока одна) -->
    <v-row dense>
      <v-col cols="12" sm="6" md="4">
        <v-card class="tile" to="/users" nuxt>
          <v-list-item two-line>
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Пользователи</v-list-item-title
              >
              <v-list-item-subtitle
                >Список клиентов, поиск, фильтры и
                пагинация</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default { name: 'HomePage' }
</script>

<style scoped>
.home-page {
  width: 100%;
}

/* hero */
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
  margin-bottom: 12px;
}

/* плитка */
.tile {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #202020;
  transition: filter 0.15s ease, transform 0.05s ease;
  cursor: pointer;
}
.theme--light .tile {
  background: #f5f5f5;
  border-color: rgba(0, 0, 0, 0.08);
}
.tile:hover {
  filter: brightness(1.04);
}

:deep(.tile .v-list-item__subtitle),
:deep(.tile .v-list-item-subtitle) {
  white-space: normal !important;
  overflow: visible !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
