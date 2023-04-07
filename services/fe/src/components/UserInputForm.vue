<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="topic" label="Topic" outlined required></v-text-field>
        <v-btn type="submit" color="primary">Generate Tutorial</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'UserInputForm',
    setup(_, { emit }) {
        const topic = ref('');

        const submitForm = () => {
            emit('submit', topic.value);
            topic.value = '';
        };

        return {
            topic,
            submitForm
        };
    }
});
</script>
