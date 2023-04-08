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
            <v-btn @click="getHint">Hint</v-btn>
            <v-btn @click="giveUp">Give Up</v-btn>
        </v-btn-group>
        <h3 v-if="hints.length">Hints:</h3>
        <v-card-text v-for="hint in hints" :key="hint">{{ hint }}</v-card-text>
        <give-up-explanation v-if="giveUpResponse" :giveUpResponse="giveUpResponse" />
        <v-card-text v-if="affirmation">{{ affirmation.happy_text }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import CodeSection from './CodeSection.vue';
import TerminalOutput from './TerminalOutput.vue';
import GiveUpExplanation from './GiveUpExplanation.vue';

import { defineComponent, inject } from 'vue';
import { CodeQuestion, GiveUpResponse, PositiveAffirmationResponse } from '@/models';
import { Pyodide } from '@/types/pyodide';
import { runPythonIsolated } from '@/pyodideLoader'
import { ApiWrapper } from '@/apiWrapper';


export default defineComponent({
    name: "TutorialQuestion",
    props: {
        question: {
            type: Object as () => CodeQuestion,
            required: true
        },
        uuid: {
            type: String,
            required: true,
        }
    },
    components: {
        CodeSection,
        TerminalOutput,
        GiveUpExplanation,
    },
    data(): {
        pyodide?: Pyodide,
        output: string,
        code: string,
        expected_output: string,
        result: string,
        has_run: boolean,
        hints: string[],
        giveUpResponse?: GiveUpResponse,
        affirmation?: PositiveAffirmationResponse,
    } {
        return {
            output: "",
            code: this.$props.question.skeleton_code.code,
            expected_output: "",
            result: "Run code to see result",
            has_run: false,
            hints: [],
            giveUpResponse: undefined,
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
                this.getPositiveAffirmation();
            } else {
                this.result = `Incorrect: expected ${this.expected_output} but got: ${this.output}`
            }
        },
        getHint() {
            this.api?.getHint({
                question: this.$props.question,
                context: {
                    theme: "todo",
                },
            }).then((response) => {
                this.hints.push(response.hint_text);
            })
        },
        giveUp() {
            this.api?.giveUp({
                context: {
                    theme: "todo",
                },
                full_code: {
                    code: this.code,
                    language: "python",
                },
            }).then((response) => {
                this.giveUpResponse = response;
            })
        },
        getPositiveAffirmation() {
            this.api?.getPositiveAffirmation({
                full_code: {
                    code: this.code,
                    language: "python",
                },
            }).then((response) => {
                this.result = response.happy_text;
            })
        }
    },
    setup() {
        var pyodide = inject<Pyodide>("$pyodide");
        var api = inject<ApiWrapper>('$api');
        return { pyodide, api }
    },
});
</script>
