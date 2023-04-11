<template>
  <v-navigation-drawer app absolute>
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dasboard"
      />
      <v-list-item
        prepend-icon="mdi-account-box"
        title="Account"
        value="home"
      />
      <v-list-item prepend-icon="mdi-gavel" title="Admin" value="admin" />
    </v-list>
    <template v-slot:append>
      <!-- centered div -->
      <div class="pa-2">
        <v-switch
          class="ma-2"
          :label="$vuetify.theme.current.dark ? 'Light mode' : 'Dark mode'"
          @change="toggleTheme"
        ></v-switch>
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  setup() {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? 'light'
          : 'dark'),
    }
  },
})
</script>
