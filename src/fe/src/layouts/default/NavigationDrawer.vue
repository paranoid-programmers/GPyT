<template>
  <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent app>
    <v-list color="transparent">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.v-main {
  height: 400px;
}
</style>
