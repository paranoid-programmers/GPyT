<template>
    <div class="give-up-explanation">
        <v-card-title>Answer:</v-card-title>
        <v-card-text>
            {{ giveUpResponse.explanation }}
        </v-card-text>
        <v-card-text>
            <b>Example solution:</b>
        </v-card-text>
        <terminal-output :output="giveUpResponse.exampleSolution" />
        <v-card-text>{{ giveUpResponse.additionalInfo }}</v-card-text>
    </div>
</template>

<script lang="ts">
import TerminalOutput from './TerminalOutput.vue';

import { defineComponent } from 'vue';
import { GiveUpResponse } from 'gpyt';

export default defineComponent({
    components: {
        TerminalOutput,
    },
    props: {
        giveUpResponse: {
            type: Object as () => GiveUpResponse,
            required: true
        },
    },
});
</script>
