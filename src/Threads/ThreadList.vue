<template>
    <div>
        <div v-for="thread_data in threads">
            <thread v-bind:data="thread_data"></thread>
        </div>
    </div>
</template>

<script>
    import nanoajax from "nanoajax"
    import Thread from "./Thread.vue"

    export default {
        name: "thread-list",
        data: function () {
            return {
                threads: []
            }
        },
        components: {
            "thread": Thread
        },
        methods: {
            get_threads() {
                nanoajax.ajax({url: "http://127.0.0.1:1337/api/get_threads"},
                    (code, response) => {
                        console.log(code);
                        if (code !== 200) {
                            console.error("There was a problem getting the threads");
                            return;
                        }
                        let res = JSON.parse(response);
                        for (let elem of res) {
                            this.threads.push(elem);
                        }
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