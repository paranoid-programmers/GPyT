<template>
    <v-container>
        <GenerateTutorialInput @generate="generateTutorial" default-theme="Skyrim" default-topic="Lists" />
        <v-row v-for="question in questions" :key="question.uuid" class="mt-4">
            <v-col cols="12">
                <TutorialQuestion :question="question.question" :uuid="question.uuid ?? 'NO-UUID'" :tutorial-uuid="uuid" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $loadScript: (url: string) => Promise<void>;
    }
}

import { defineComponent, inject, provide, shallowRef, Ref } from 'vue';
import TutorialQuestion from './TutorialQuestion.vue';
import GenerateTutorialInput from './GenerateTutorialInput.vue';

import { CodeTutorialApi, NewCodeTutorialResponse, UniqueCodeQuestion } from 'gpyt';
import { Pyodide } from '@/types/pyodide';
import { loadPyodide } from '@/pyodideLoader';


export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialQuestion,
        GenerateTutorialInput
    },
    data(): { questions: UniqueCodeQuestion[], uuid: string } {
        return {
            questions: [],
            uuid: "",
        }
    },
    methods: {
        generateTutorial(input: { topic: string, theme: string }) {
            // check if api is defined
            this.api?.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost({
                concept: input.topic,
                context: {
                    interests: [input.theme],
                    tone: "angry"
                }
            }).then((response: NewCodeTutorialResponse) => {
                this.uuid = response.tutorial.uuid ?? "NO-UUID";
                this.questions = response.tutorial.questions ?? [];
            });
        },
        async loadPyodide() {
            loadPyodide(this.$loadScript).then((pyodide) => {
                this.pyodide = pyodide;
            })
        },
    },
    setup() {
        var api = inject<CodeTutorialApi>('$api');
        var pyodide = shallowRef<Pyodide>();
        provide<Ref<Pyodide | undefined>>("$pyodide", pyodide);
        return { api, pyodide }
    },
    mounted() {
        this.loadPyodide();
    },
});
</script>
