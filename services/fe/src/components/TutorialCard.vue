<template>
    <v-card>
        <v-card-title>{{ tutorial.title }}</v-card-title>
        <v-card-text>{{ tutorial.content }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TutorialCard',
    props: {
        tutorial: {
            type: Object,
            required: true
        }
    }
});
</script>
