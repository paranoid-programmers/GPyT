<template>
    <v-card>
        <v-card-title>{{ question.title }}</v-card-title>
        <v-card-text>{{ question.description }}</v-card-text>
        <code-section :value="question.skeleton_code.code" v-model="code" />
        <v-card-text>{{ code }}</v-card-text>
        <!-- a display string for each string in outputs -->
        <v-card-text v-for="output in outputs" :key="output">{{ output }}</v-card-text>
        <v-btn @click="runCode">Run Code</v-btn>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { CodeQuestion } from '@/models';
import CodeSection from './CodeSection.vue';
import { Pyodide } from '@/types/pyodide';


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
    },
    data(): { pyodide?: Pyodide, outputs: string[], code: string } {
        return {
            pyodide: undefined,
            outputs: [],
            code: '',
        }
    },
    methods: {
        runCode() {
            console.log("running code");
            console.log(this.pyodide);
        },
        codeUpdated(code: string) {
            this.code = code;
        }
    },
    setup() {
        var pyodide = inject<Pyodide>("$pyodide");
        return { pyodide }
    },
});
</script>
