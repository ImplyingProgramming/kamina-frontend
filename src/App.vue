<template>
    <div>
        <h1>All threads</h1>
        <div v-for="thread_data in threads">
            <thread v-bind:data="thread_data"></thread>
        </div>
    </div>
</template>

<script>
    import nanoajax from "nanoajax"
    import Thread from "./Thread.vue"

    export default {
        components: {
            thread: Thread
        },
        data() {
            return {
                threads: []
            }
        },
        mounted() {
            this.get_threads();
        },
        methods: {
            get_threads() {
                nanoajax.ajax({url: "http://127.0.0.1:1337/api/get_threads"}, (code, response) => {
                    let res = JSON.parse(response);
                    for (let elem of res) {
                        this.$data.threads.push(elem);
                    }
                });
            }
        }
    }
</script>
