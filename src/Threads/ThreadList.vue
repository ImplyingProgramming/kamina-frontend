<template>
    <div>
        <div v-for="thread_data in threads">
            <thread-summary :threadJson="thread_data"></thread-summary>
        </div>
    </div>
</template>

<script>
    import Thread from "./ThreadView.vue"

    export default {
        name: "thread-list",
        data: function () {
            return {
                threads: []
            }
        },
        components: {
            "thread-summary": Thread
        },
        methods: {
            /**
             * Get threads from the API
             */
            get_threads() {
                this.$http.get("http://127.0.0.1:1337/api/get_threads")
                    .then(response => {
                        let res = JSON.parse(response.bodyText);
                        for (let elem of res) {
                            this.threads.push(elem);
                        }
                    }, error => {
                        console.error("There was a problem getting the threads.");
                    });
            }
        },
        mounted() {
            this.get_threads();
        }
    }
</script>

<style scoped>

</style>