<!-- CodeEditor.vue -->
<template>
    <div>
        <codemirror v-model="code" :options="editorOptions" @input="onInput" ref="editor" :extensions="extensions" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { python } from '@codemirror/lang-python'

export default defineComponent({
    components: { Codemirror },
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const code = ref(props.value);
        const extensions = [python()]
        const editorOptions = {
            mode: "python",
            // are additional plugins/addons needed here?
            theme: "material",
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
        };

        function onInput() {
            emit("update:modelValue", code.value);
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
