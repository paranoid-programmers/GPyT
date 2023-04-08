<template>
    <v-container>
        <GenerateTutorialInput @generate="generateTutorial" />
        <v-row v-for="question, key in questions" :key="key" class="mt-4">
            <v-col cols="12">
                <TutorialQuestion :question="question" />
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
import { NewTutorialResponse, CodeQuestion } from '@/models';
import { ApiWrapper } from '../apiWrapper'
import { Pyodide } from '@/types/pyodide';
import { loadPyodide } from '@/pyodideLoader';


export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialQuestion,
        GenerateTutorialInput
    },
    data(): { questions: Record<string, CodeQuestion>, uuid: string } {
        return {
            questions: {},
            uuid: "",
        }
    },
    methods: {
        generateTutorial(topic: string) {
            // check if api is defined
            this.api?.getNewTutorial({
                context: {
                    theme: "test theme",
                },
                concept: topic
            }).then((response: NewTutorialResponse) => {
                this.uuid = response.uuid;
                this.questions = response.tutorial.questions;

            });
        },
        async loadPyodide() {
            loadPyodide(this.$loadScript).then((pyodide) => {
                this.pyodide = pyodide;
            })
        },
    },
    setup() {
        var api = inject<ApiWrapper>('$api');
        var pyodide = shallowRef<Pyodide>();
        provide<Ref<Pyodide | undefined>>("$pyodide", pyodide);
        return { api, pyodide }
    },
    mounted() {
        this.loadPyodide();
    },
});
</script>
