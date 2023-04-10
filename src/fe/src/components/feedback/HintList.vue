<template>
  <v-card-title v-if="hints.length">Hints:</v-card-title>
  <LoadingCard
    v-for="(loading, index) in hintsLoading"
    :key="index"
    :loading="loading"
  >
    <markdown :source="hints[index]" />
  </LoadingCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingCard from '../helpers/LoadingCard.vue'
import Markdown from '../helpers/Markdown.vue'

export default defineComponent({
  components: {
    LoadingCard,
    Markdown,
  },
  props: {
    hints: {
      type: Object as () => string[],
      required: true,
    },
    hintsLoading: {
      type: Object as () => boolean[],
      required: true,
    },
  },
})
</script>
