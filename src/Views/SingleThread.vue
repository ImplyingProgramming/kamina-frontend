<template>
    <div>
        <thread-view :threadJson="threadJson"></thread-view>
    </div>
</template>

<script>
    import ThreadSingleView from "../Threads/ThreadShow";

    export default {
        name: "view",
        components: {
            "thread-view": ThreadSingleView
        },
        data() {
            return {
                threadJson: this.$store.state.threadViewId
            }
        },
        mounted() {
            // Get the responses of a thread (?
        }
    }
</script>

<style scoped>

</style>