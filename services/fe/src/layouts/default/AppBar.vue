<template>
  <v-app-bar>
    <v-container>
      <v-switch label="Dark mode" @change="toggleTheme"></v-switch>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  setup() {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
})

</script>
