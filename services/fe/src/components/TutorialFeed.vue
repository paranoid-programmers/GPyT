<template>
    <v-container>
        <user-input-form @submit="generateTutorial" />
        <v-row>
            <v-col v-for="tutorial in tutorials" :key="tutorial.id" cols="12" sm="6" md="4">
                <tutorial-card :tutorial="tutorial" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TutorialCard from './TutorialCard.vue';
import UserInputForm from './UserInputForm.vue';

export default defineComponent({
    name: 'TutorialFeed',
    components: {
        TutorialCard,
        UserInputForm
    },
    setup() {
        const tutorials = ref([]);

        const generateTutorial = async (topic: string) => {
            // Call your backend API to generate the tutorial content.
            // For example:
            // const response = await axios.post('/api/generate-tutorial', { topic });
            // tutorials.value.push(response.data);
        };

        return {
            tutorials,
            generateTutorial
        };
    }
});
</script>
