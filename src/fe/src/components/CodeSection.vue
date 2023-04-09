<!-- CodeEditor.vue -->
<template>
    <div>
        <codemirror v-model="code" placeholder="Code goes here..." :options="editorOptions" :indent-with-tab="true"
            :tab-size="2" @change="onInput($event)" ref="editor" :extensions="extensions" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { python } from '@codemirror/lang-python'

export default defineComponent({
    components: { Codemirror },
    props: {
        source: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const code = ref(props.source);
        const extensions = [python()]
        const editorOptions = {
            mode: "python",
            // are additional plugins/addons needed here?
            theme: "material",
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
        };

        function onInput(event: string) {
            emit("update:modelValue", event);
        }

        return {
            code,
            extensions,
            editorOptions,
            onInput,
        };
    },
});
</script>
