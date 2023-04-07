<template>
    <v-card>
        <v-card-title>{{ question.title }}</v-card-title>
        <v-card-text>{{ question.description }}</v-card-text>
        <code-section :value="question.skeleton_code.code" />
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CodeQuestion } from '@/types';
import CodeSection from './CodeSection.vue';

export default defineComponent({
    name: "TutorialQuestion",
    props: {
        question: {
            type: Object as () => CodeQuestion,
            required: true
        }
    },
    components: {
        CodeSection
    }
});
</script>
