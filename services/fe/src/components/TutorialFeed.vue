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

import { defineComponent, inject } from 'vue';
import TutorialQuestion from './TutorialQuestion.vue';
import GenerateTutorialInput from './GenerateTutorialInput.vue';
import { NewTutorialResponse, CodeQuestion } from '@/models';
import { ApiWrapper } from '../apiWrapper'
import { Pyodide } from '@/types/pyodide';


export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialQuestion,
        GenerateTutorialInput
    },
    data(): { questions: Record<string, CodeQuestion>, uuid: string, pyodide?: Pyodide } {
        return {
            questions: {},
            uuid: "",
            pyodide: undefined
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
            try {
                await this.$loadScript('https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js');

                let stdout_text: string[] = [];

                let stdout_function = function (text: string) {
                    stdout_text.push(text);
                }

                this.pyodide = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.0/full/',
                    stdout: stdout_function,
                });
                // Use Pyodide here
                console.log('Pyodide is ready');


                let test = this.pyodide.runPython(`
                    import sys
                    print(sys.version)
                    print("hey")
                `);
                console.log({ "outputs": stdout_text })
            } catch (error) {
                console.error('Failed to load Pyodide:', error);
            }
        },
    },
    setup() {
        var api = inject<ApiWrapper>('$api');

        return { api };
    },
    mounted() {
        this.loadPyodide();
    },
});
</script>
