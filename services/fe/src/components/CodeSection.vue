<!-- CodeEditor.vue -->
<template>
    <div>
        <codemirror v-model="code" :options="editorOptions" @input="onInput" ref="editor"></codemirror>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";

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
        const editorOptions = {
            mode: "python",
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
            editorOptions,
            onInput,
        };
    },
});
</script>
