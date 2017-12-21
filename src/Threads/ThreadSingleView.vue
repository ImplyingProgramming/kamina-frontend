<template>
    <div>
        <thread-view :threadJson="threadInfo"></thread-view>
    </div>
</template>

<script>
    import Thread from "./ThreadView";

    export default {
        name: "view",
        components: {
            "thread-view": Thread
        },
        data() {
            return {
                threadId: this.$store.state.threadViewId,
                threadInfo: {}
            }
        },
        mounted() {
            // Get information of a single thread
            this.$http.get("http://127.0.0.1:1337/api/get_thread",
                { params: { "post-id": this.threadId } })
                .then(response => {
                    this.threadInfo = JSON.parse(response.bodyText);
                }, error => {
                    console.error(`There was a problem getting the thread information`);
                });
        }
    }
</script>

<style scoped>

</style>