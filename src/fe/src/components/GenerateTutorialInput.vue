<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="tone" label="Tone" outlined required placeholder="i.e. Angry" />
        <v-text-field v-model="topic" label="Python Topic" outlined required placeholder="i.e. Lists"></v-text-field>
        <v-card-title>Interests</v-card-title>
        <v-chip-group column v-model="selectedChips">
            <v-chip v-for="(chip, index) in chips" :key="chip" closable @click:close="removeChip(index)">
                {{ chip }}
            </v-chip>
        </v-chip-group>
        <v-text-field @submit.prevent="addChip" v-model="newChip" label="Add a new interest" @keyup.enter="addChip" />
        <v-btn type="submit" color="primary">Generate Tutorial</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NewTutorialRequest } from 'gpyt';

export default defineComponent({
    name: 'GenerateTutorialInput',
    props: {
        // defaults
        defaultTopic: {
            type: String,
            default: ''
        },
        defaultTone: {
            type: String,
            default: ''
        }
    },
    data(): { topic: string, tone: string, chips: string[], selectedChips: string[], newChip: string } {
        return {
            topic: this.$props.defaultTopic,
            tone: this.$props.defaultTone,
            chips: ['skyrim', 'cats'],
            selectedChips: [],
            newChip: '',
        }
    },
    methods: {
        submitForm() {
            // ensure it's not empty
            if (!this.topic) {
                return;
            }
            var output: NewTutorialRequest = {
                concept: this.topic,
                context: {
                    interests: this.chips,
                    tone: this.tone
                }
            }
            this.$emit('generate', output);
        },
        addChip() {
            if (this.newChip) {
                this.chips.push(this.newChip);
                this.newChip = '';
            }
        },
        removeChip(index: number) {
            this.chips.splice(index, 1);
        }
    }
});
</script>
