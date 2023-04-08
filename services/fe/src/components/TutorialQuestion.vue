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
        runCode() {
            this.output = "";
            this.pyodide?.runPython("globals().clear()")
            this.pyodide?.setStdout({
                batched: (output: string) => {
                    this.output += `${output}\n`;
                }
            });

            try {
                this.pyodide?.runPython(this.code);
            } catch (e: any) {
                this.output += e.toString();
            }
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
