<template>
  <v-card v-if="loading">
    <div class="loadingDiv">
      <v-progress-circular
        :size="50"
        :width="5"
        color="rgb(var(--v-theme-primary))"
        indeterminate
      />
    </div>
  </v-card>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingComponent',
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style scoped>
.loadingDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 15px;
}
</style>
