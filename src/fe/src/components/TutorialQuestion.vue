<template>
    <v-card>
        <v-card-title>{{ question.title }}</v-card-title>
        <markdown :content="question.description" />
        <code-section :value="question.skeletonCode.code" v-model="code" />
        <v-btn-group>
            <v-btn @click="runCode">Run Code</v-btn>
            <v-btn @click="getHint">Hint</v-btn>
            <v-btn @click="giveUp">Give Up</v-btn>
        </v-btn-group>
        <code-output v-if="output" :output="output" :expected="expected_output" />
        <v-card-title v-if="hints.length">Hints:</v-card-title>
        <markdown v-for="hint in hints" :key="hint" :content="hint" />
        <give-up-explanation v-if="giveUpResponse" :solution="question.solutionCode.code" :giveUpResponse="giveUpResponse"
            :correctAnswer="question.solutionCode.code" />
        <affirmation v-if="affirmationResp" :affirmationResponse="affirmationResp" />
    </v-card>
</template>

<script lang="ts">
import CodeSection from './CodeSection.vue';
import CodeOutput from './CodeOutput.vue';
import TerminalOutput from './TerminalOutput.vue';
import GiveUpExplanation from './GiveUpExplanation.vue';
import Affirmation from './Affirmation.vue';
import Markdown from './Markdown.vue';


import { defineComponent, inject } from 'vue';
import { Pyodide } from '@/types/pyodide';
import { runPythonIsolated } from '@/pyodideLoader'
import { CodeTutorialApi, CodeQuestion, GiveUpResponse, PositiveAffirmationResponse } from 'gpyt';

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
        },
        tutorialUuid: {
            type: String,
            required: true,
        },
    },
    components: {
        CodeSection,
        TerminalOutput,
        GiveUpExplanation,
        Affirmation,
        Markdown,
        CodeOutput,
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
        affirmationResp?: PositiveAffirmationResponse,
    } {
        return {
            output: "",
            code: this.$props.question.skeletonCode.code,
            expected_output: "",
            result: "Run code to see result",
            has_run: false,
            hints: [],
            giveUpResponse: undefined,
            affirmationResp: undefined,
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
                    this.question.solutionCode.code, this.pyodide
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
            if (this.output == this.expected_output) {
                this.getPositiveAffirmation();
            }
        },
        getHint() {
            this.api?.hintApiV1CodeTutorialHintPost({
                questionUuid: this.uuid,
                tutorialUuid: this.tutorialUuid,
                userCode: {
                    code: this.code,
                    language: "python",
                }
            }).then((response) => {
                this.hints.push(response.hintText);
            })
        },
        giveUp() {
            this.api?.giveUpApiV1CodeTutorialGiveUpPost({
                questionUuid: this.uuid,
                tutorialUuid: this.tutorialUuid,
                userCode: {
                    code: this.code,
                    language: "python",
                }
            }).then((response) => {
                console.log(response)
                this.giveUpResponse = response;
            })
        },
        getPositiveAffirmation() {
            this.api?.affirmationApiV1CodeTutorialAffirmationPost({
                attemptsTaken: 3,
                tutorialUuid: this.tutorialUuid,
            }).then((response) => {
                this.affirmationResp = response;
            })
        }
    },
    setup() {
        var pyodide = inject<Pyodide>("$pyodide");
        var api = inject<CodeTutorialApi>('$api');
        return { pyodide, api }
    },
});
</script>
