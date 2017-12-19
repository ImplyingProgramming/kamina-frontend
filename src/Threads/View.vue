<template>
    <h1>{{ threadId }}</h1>
</template>

<script>
    export default {
        name: "view",
        computed: {
            threadId() {
                return this.$route.params.id;
            }
        }
    }
</script>

<style scoped>

</style>