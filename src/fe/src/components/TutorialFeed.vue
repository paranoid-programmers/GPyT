<template>
  <v-container style="overflow-y: scroll" class="tutorial-container">
    <GenerateTutorialInput
      @generate="generateTutorial"
      default-tone="Sarcastic"
      default-topic="Lists"
      :loading-question="loadingQuestion"
    />
    <LoadingCard :loading="loadingQuestion" class="mt-4">
      <v-row v-for="question in questions" :key="question.uuid">
        <v-col cols="12">
          <TutorialQuestion
            :question="question.question"
            :uuid="question.uuid ?? 'NO-UUID'"
            :tutorial-uuid="uuid"
          />
        </v-col>
      </v-row>
    </LoadingCard>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import TutorialQuestion from './TutorialQuestion.vue'
import GenerateTutorialInput from './GenerateTutorialInput.vue'
import LoadingCard from './helpers/LoadingCard.vue'

import {
  CodeTutorialApi,
  NewCodeTutorialResponse,
  NewTutorialRequest,
  UniqueCodeQuestion,
} from 'gpyt'

export default defineComponent({
  name: 'TutorialFeed',
  components: {
    TutorialQuestion,
    GenerateTutorialInput,
    LoadingCard,
  },
  data(): {
    questions: UniqueCodeQuestion[]
    uuid: string
    loadingQuestion: boolean
  } {
    return {
      questions: [],
      uuid: '',
      loadingQuestion: false,
    }
  },
  methods: {
    generateTutorial(input: NewTutorialRequest) {
      // check if api is defined
      this.questions = []
      this.loadingQuestion = true
      this.api
        ?.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(input)
        .then((response: NewCodeTutorialResponse) => {
          this.loadingQuestion = false
          this.uuid = response.tutorial.uuid ?? 'NO-UUID'
          this.questions = response.tutorial.questions ?? []
        })
    },
  },
  setup() {
    var api = inject<CodeTutorialApi>('$api')
    return { api }
  },
})
</script>
