<template>
    <div>
        <div v-for="threadInfo in threadData">
            <thread-view :threadJson="threadInfo"></thread-view>
        </div>
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
                threadData: []
            }
        },
        mounted() {
            // Get information of a single thread
            this.$http.get("http://127.0.0.1:1337/api/get_thread",
                { params: { "post-id": this.threadId } })
                .then(response => {
                    this.threadData.push(JSON.parse(response.bodyText));
                }, error => {
                    console.error(`There was a problem getting the thread information`);
                });
        }
    }
</script>

<style scoped>

</style>