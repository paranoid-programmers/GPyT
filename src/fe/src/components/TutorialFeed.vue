<template>
  <v-container>
    <GenerateTutorialInput
      @generate="generateTutorial"
      default-tone="Sarcastic"
      default-topic="Lists"
    />
    <v-row v-for="question in questions" :key="question.uuid" class="mt-4">
      <v-col cols="12">
        <TutorialQuestion
          :question="question.question"
          :uuid="question.uuid ?? 'NO-UUID'"
          :tutorial-uuid="uuid"
        />
      </v-col>
    </v-row>
    <Preloader v-if="loadingQuestion" :scale="0.5" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, inject, provide, shallowRef, Ref } from 'vue'
import TutorialQuestion from './TutorialQuestion.vue'
import GenerateTutorialInput from './GenerateTutorialInput.vue'
import Preloader from './Preloader.vue'

import {
  CodeTutorialApi,
  NewCodeTutorialResponse,
  NewTutorialRequest,
  UniqueCodeQuestion,
} from 'gpyt'
import { Pyodide } from '@/types/pyodide'
import { loadPyodide } from '@/pyodideLoader'

export default defineComponent({
  name: 'TutorialFeed',
  components: {
    TutorialQuestion,
    GenerateTutorialInput,
    Preloader,
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
    async loadPyodide() {
      loadPyodide(this.$loadScript).then((pyodide) => {
        this.pyodide = pyodide
      })
    },
  },
  setup() {
    var api = inject<CodeTutorialApi>('$api')
    var pyodide = shallowRef<Pyodide>()
    provide<Ref<Pyodide | undefined>>('$pyodide', pyodide)
    return { api, pyodide }
  },
  mounted() {
    this.loadPyodide()
  },
})
</script>
