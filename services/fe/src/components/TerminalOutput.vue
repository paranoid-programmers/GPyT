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
    background-color: #ebebeb;
    /* color: #00ff00; */
    padding: 10px;
    /* max-width: 100%; */
    overflow: auto;
    /* border: 1px solid #00ff00; */
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
}
</style>
