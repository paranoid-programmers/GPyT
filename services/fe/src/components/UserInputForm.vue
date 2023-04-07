<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="topic" label="Topic" outlined required></v-text-field>
        <v-btn type="submit" color="primary">Generate Tutorial</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UserInputForm',
    data(): { topic: string } {
        return {
            topic: ''
        }
    },
    methods: {
        submitForm(event: any) {
            console.log(this.topic);
            this.$emit('submit', this.topic);
            this.topic = '';
        }
    }
});
</script>
