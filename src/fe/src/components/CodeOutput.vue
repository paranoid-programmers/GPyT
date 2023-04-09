<template>
    <v-card-text>Output:</v-card-text>
    <terminal-output :output="output" />
    <v-card-text>Expected:</v-card-text>
    <terminal-output :output="expected" />
</template>


<script lang="ts">
import TerminalOutput from './TerminalOutput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        TerminalOutput,
    },
    props: {
        output: {
            type: String,
            required: true
        },
        expected: {
            type: String,
            required: true
        },
    },
})


</script>
