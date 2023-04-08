<template>
    <div class="give-up-explanation">
        <h2>Give Up</h2>
        <p>
            {{ giveUpResponse.explanation }}
        </p>
        <p>
            <b>Expected Output:</b>
        </p>
        <terminal-output :output="giveUpResponse.example_solution" />
        <v-card-text>{{ giveUpResponse.additional_info }}</v-card-text>
    </div>
</template>

<script lang="ts">
import TerminalOutput from './TerminalOutput.vue';

import { defineComponent } from 'vue';
import { GiveUpResponse } from '@/models';

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
