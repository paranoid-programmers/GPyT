<template>
  <div class="give-up-explanation">
    <v-card-title>Answer:</v-card-title>
    <markdown :source="giveUpResponse.explanation" />
    <v-card-text>
      <b>Example solution:</b>
    </v-card-text>
    <code-section :source="solution" />
    <markdown
      v-if="giveUpResponse.additionalInfo"
      :source="giveUpResponse.additionalInfo"
    />
  </div>
</template>

<script lang="ts">
import TerminalOutput from './TerminalOutput.vue'
import CodeSection from './CodeSection.vue'

import { defineComponent } from 'vue'
import { GiveUpResponse } from 'gpyt'
import Markdown from './Markdown.vue'

export default defineComponent({
  components: {
    TerminalOutput,
    Markdown,
    CodeSection,
  },
  props: {
    giveUpResponse: {
      type: Object as () => GiveUpResponse,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
  },
})
</script>
