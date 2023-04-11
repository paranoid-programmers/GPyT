<template>
  <v-app>
    <v-layout>
      <default-navigation-drawer> </default-navigation-drawer>
      <default-view />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue'
import DefaultNavigationDrawer from './NavigationDrawer.vue'
</script>
