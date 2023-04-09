<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="theme" label="Theme" outlined required placeholder="i.e. Cowboys" />
        <v-text-field v-model="topic" label="Topic" outlined required placeholder="i.e. Dictionaries"></v-text-field>
        <v-btn type="submit" color="primary">Generate Tutorial</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GenerateTutorialInput',
    props: {
        // defaults
        defaultTopic: {
            type: String,
            default: ''
        },
        defaultTheme: {
            type: String,
            default: ''
        }
    },
    data(): { topic: string, theme: string } {
        return {
            topic: this.$props.defaultTopic,
            theme: this.$props.defaultTheme,
        }
    },
    methods: {
        submitForm() {
            // ensure it's not empty
            if (!this.topic) {
                return;
            }
            this.$emit('generate', { topic: this.topic, theme: this.theme });
        }
    }
});
</script>
