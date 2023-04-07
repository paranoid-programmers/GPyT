<template>
    <v-container>
        <GenerateTutorialInput @generate="generateTutorial" />
        <v-row v-for="question in questions" :key="question.uuid" class="mt-4">
            <v-col cols="12">
                <TutorialQuestion :question="question" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import TutorialQuestion from './TutorialQuestion.vue';
import GenerateTutorialInput from './GenerateTutorialInput.vue';
import { NewTutorialResponse, Question } from '@/types';
import { ApiWrapper } from '../apiWrapper'


export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialQuestion,
        GenerateTutorialInput
    },
    data(): { questions: Question[], uuid: string } {
        return {
            questions: [],
            uuid: ""
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
                // Extend questions with response.questions
                this.questions = [
                    ...this.questions,
                    ...response.questions
                ];
            });
        }
    },
    setup() {
        var api = inject<ApiWrapper>('$api');
        // make api available elsewhere
        return { api };
    }
});
</script>
