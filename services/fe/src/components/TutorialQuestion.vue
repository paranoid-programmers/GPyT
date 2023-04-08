<template>
    <v-card>
        <v-card-title>{{ question.title }}</v-card-title>
        <v-card-text>{{ question.description }}</v-card-text>
        <code-section :value="question.skeleton_code.code" v-model="code" />
        <h3>Outputs:</h3>
        <terminal-output :output="output" />
        <v-btn @click="runCode">Run Code</v-btn>
    </v-card>
</template>

<script lang="ts">
import CodeSection from './CodeSection.vue';
import TerminalOutput from './TerminalOutput.vue';

import { defineComponent, inject } from 'vue';
import { CodeQuestion } from '@/models';
import { Pyodide } from '@/types/pyodide';
import { runPythonIsolated } from '@/pyodideLoader'


export default defineComponent({
    name: "TutorialQuestion",
    props: {
        question: {
            type: Object as () => CodeQuestion,
            required: true
        }
    },
    components: {
        CodeSection,
        TerminalOutput,
    },
    data(): { pyodide?: Pyodide, output: string, code: string } {
        return {
            pyodide: undefined,
            output: "",
            code: this.$props.question.skeleton_code.code,
        }
    },
    methods: {
        async runCode() {
            this.output = "";
            if (!this.pyodide) {
                return
            }
            runPythonIsolated(this.code, this.pyodide).then((output) => {
                this.output = output;
            })
        },
        codeUpdated(code: string) {
            this.code = code;
        }
    },
    setup(props) {
        var pyodide = inject<Pyodide>("$pyodide");

        props.question.solution_code.code

        return { pyodide }
    },
});
</script>
