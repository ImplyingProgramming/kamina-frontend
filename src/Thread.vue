<template>
    <div class="thread">
        <h3>{{ data.title }}</h3>
        <p>{{ data.body }}</p>
        <p>id: {{ data.id }}</p>
    </div>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

<style scoped>
    .thread h3 {
        margin: 0;
    }

    .thread {
        font-family: Arial, Helvetica, "sans-serif";
        border: 1px solid black;
        margin-bottom: 15px;
        padding: 5px;
    }
</style>
