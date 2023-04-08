<template>
    <v-card-text>
        {{ affirmationResponse.happyText }}
    </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PositiveAffirmationResponse } from 'gpyt';

export default defineComponent({
    props: {
        affirmationResponse: {
            type: Object as () => PositiveAffirmationResponse,
            required: true
        },
    },
});
</script>
