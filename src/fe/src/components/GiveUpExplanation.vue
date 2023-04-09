<template>
    <div class="give-up-explanation">
        <v-card-title>Answer:</v-card-title>
        <markdown :content="giveUpResponse.explanation" />
        <v-card-text>
            <b>Example solution:</b>
        </v-card-text>
        <terminal-output :output="giveUpResponse.exampleSolution" />
        <markdown v-if="giveUpResponse.additionalInfo" :content="giveUpResponse.additionalInfo" />
    </div>
</template>

<script lang="ts">
import TerminalOutput from './TerminalOutput.vue';

import { defineComponent } from 'vue';
import { GiveUpResponse } from 'gpyt';
import Markdown from './Markdown.vue';

export default defineComponent({
    components: {
        TerminalOutput,
        Markdown,
    },
    props: {
        giveUpResponse: {
            type: Object as () => GiveUpResponse,
            required: true
        },
    },
});
</script>
