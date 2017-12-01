<template>
    <div id="root">
        <h1>All threads</h1>
        {{ get_threads() }}
    </div>
</template>

<script>
    import nanoajax from "nanoajax"
    import Thread from "./Thread.vue"

    export default {
        methods: {
            get_threads() {
                nanoajax.ajax({url: "http://127.0.0.1:1337/api/get_threads"}, function (code, response) {
                    console.log(JSON.parse(response));
                });
            }
        }
    }
</script>

<style>

</style>
