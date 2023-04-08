<template>
    <v-card>
        <v-card-title>{{ question.title }}</v-card-title>
        <v-card-text>{{ question.description }}</v-card-text>
        <code-section :value="question.skeleton_code.code" v-model="code" />
        <h3>Outputs:</h3>
        <terminal-output :output="output" />
        <h3>{{ result }}</h3>
        <v-btn-group>
            <v-btn @click="runCode">Run Code</v-btn>
            <v-btn @click="runCode">Hint</v-btn>
            <v-btn @click="runCode">Give Up</v-btn>
        </v-btn-group>

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
    data(): {
        pyodide?: Pyodide,
        output: string,
        code: string,
        expected_output: string,
        result: string,
        has_run: boolean,
        hints: string[],
    } {
        return {
            output: "",
            code: this.$props.question.skeleton_code.code,
            expected_output: "",
            result: "Run code to see result",
            has_run: false,
            hints: [],
        }
    },
    methods: {
        async runCode() {
            if (!this.pyodide) {
                return
            }
            // check if expected output is empty
            if (this.expected_output == "") {
                // run the solution code and set the expected output
                this.expected_output = await runPythonIsolated(
                    this.question.solution_code.code, this.pyodide
                );
            }
            this.output = "";
            runPythonIsolated(this.code, this.pyodide).then((output) => {
                this.output = output;
                this.has_run = true;
            }).then(() => {
                this.checkOutput();
            })
        },
        codeUpdated(code: string) {
            this.code = code;
        },
        checkOutput() {
            // check if output is equal to expected output
            if (this.output == this.expected_output) {
                this.result = "Correct!"
            } else {
                this.result = `Incorrect: expected ${this.expected_output} but got: ${this.output}`
            }
        }
    },
    setup() {
        var pyodide = inject<Pyodide>("$pyodide");
        return { pyodide }
    },
});
</script>
