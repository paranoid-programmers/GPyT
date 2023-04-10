<template>
  <v-card-text>Output:</v-card-text>
  <code-output :output="actual" />
  <v-card-text>Expected:</v-card-text>
  <code-output :output="expected" />
</template>

<script lang="ts">
import CodeOutput from './CodeOutput.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CodeOutput: CodeOutput,
  },
  props: {
    actual: {
      type: String,
      required: true,
    },
    expected: {
      type: String,
      required: true,
    },
  },
})
</script>
