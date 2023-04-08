<template>
    <div class="terminal">
        <pre>{{ output }}</pre>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        output: String,
    },
};
</script>

<style scoped>
.terminal {
    padding: 10px;
    overflow: auto;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
}
</style>
