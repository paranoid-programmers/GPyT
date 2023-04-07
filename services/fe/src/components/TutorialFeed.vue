<template>
    <v-container>
        <user-input-form @generate="generateTutorial" />
        <v-row v-for="tutorialSection in tutorialSections" :key="tutorialSections.uuid" class="mt-4">
            <v-col cols="12">
                <tutorial-card :tutorial="tutorial" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TutorialCard from './TutorialCard.vue';
import GenerateTutorialInput from './GenerateTutorialInput.vue';
import { TutorialSection } from '@/types';




export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialCard,
        GenerateTutorialInput
    },
    data(): { tutorialSections: TutorialSection[] } {
        return {
            tutorialSections: []
        }
    },
    methods: {
        generateTutorial(topic: string) {
            // Call your backend API to generate the tutorial content.
            // For example:
            // const response = await axios.post('/api/generate-tutorial', { topic });
            // tutorials.value.push(response.data);

            console.log("hello", topic)
            // this.tutorialSection.push({
            //     uuid: "", // Assuming UUID is in string format
            //     title: string;
            //     description: string;
            //     partial_code: CodeBlock;
            //     expected_output: string;
            // });
        }
    }
});
</script>
