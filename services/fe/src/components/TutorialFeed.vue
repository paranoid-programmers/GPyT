<template>
    <v-container>
        <user-input-form @submit="generateTutorial" />
        <v-row v-for="tutorial in tutorials" :key="tutorial.id" class="mt-4">
            <v-col cols="12">
                <tutorial-card :tutorial="tutorial" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TutorialCard from './TutorialCard.vue';
import UserInputForm from './UserInputForm.vue';
import { Tutorial } from '@/types';

export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialCard,
        UserInputForm
    },
    setup() {
        const tutorials = ref<Tutorial[]>([]);
        const generateTutorial = async (topic: string) => {
            // Call your backend API to generate the tutorial content.
            // For example:
            // const response = await axios.post('/api/generate-tutorial', { topic });
            // tutorials.value.push(response.data);

            console.log("hello", topic)
            tutorials.value.push({
                id: Math.random(),
                title: topic,
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.'
            });
        };

        return {
            tutorials,
            generateTutorial
        };
    }
});
</script>
