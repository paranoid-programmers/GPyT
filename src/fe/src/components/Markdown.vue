<template>
    <v-card-text v-html="compiledContent" />
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default defineComponent({
    props: {
        content: {
            type: String,
            required: true
        },
    },
    computed: {
        compiledContent(): string {
            let dirty = marked(this.$props.content);
            return DOMPurify.sanitize(dirty);
        }
    }
})

</script>
