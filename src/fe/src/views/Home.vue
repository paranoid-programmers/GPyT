<template>
  <TutorialFeed />
</template>

<script lang="ts">
import TutorialFeed from '@/components/TutorialFeed.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TutorialFeed,
  },
  methods: {
    onScroll() {
      console.log('scrolling')
    },
  },
})
</script>
