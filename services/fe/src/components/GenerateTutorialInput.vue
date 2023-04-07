<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="topic" label="Topic" outlined required></v-text-field>
        <v-btn type="submit" color="primary">Generate Tutorial</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GenerateTutorialInput',
    data(): { topic: string } {
        return {
            topic: ''
        }
    },
    methods: {
        submitForm() {
            // ensure it's not empty
            if (!this.topic) {
                return;
            }
            this.$emit('generate', this.topic);
            this.topic = '';
        }
    }
});
</script>
