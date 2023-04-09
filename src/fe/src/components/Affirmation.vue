<template>
    <markdown :content="affirmationResponse.happyText" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PositiveAffirmationResponse } from 'gpyt';
import Markdown from './Markdown.vue';

export default defineComponent({
    components: {
        Markdown,
    },
    props: {
        affirmationResponse: {
            type: Object as () => PositiveAffirmationResponse,
            required: true
        },
    },
});
</script>
