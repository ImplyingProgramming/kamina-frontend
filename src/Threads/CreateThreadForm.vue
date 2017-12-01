<template>
    <!-- Use ajax for form submission -->
    <div id="cthread-form">
        <label for="cthread-title">Title: </label>
        <input id="cthread-title" type="text" v-model="title">
        <br>
        <label for="cthread-body">Body:</label>
        <br><textarea v-model="body" id="cthread-body" cols="30" rows="10"></textarea><br>
        <label for="cthread-file">File:</label>
        <input type="file" id="cthread-file"><br>
        <button v-on:click="make_thread">Create</button>
    </div>
</template>

<script>
    import nanoajax from "nanoajax"

    export default {
        name: "create-thread-form",
        data() {
            return {
                title: "",
                body: "",
                media: undefined
            }
        },
        methods: {
            make_thread() {
                let thread_title = this.title;
                let thread_body = this.body;
                let thread_media = this.media;
                nanoajax.ajax({
                    url: "http://127.0.0.1:1337/api/make_thread",
                    method: "POST",
                    body: `title=${thread_title}&body=${thread_body}`
                }, (code, response, request) => {
                    console.log(code);
                    if (code !== 200) {
                        console.error("There was an error creating your thread");
                    }
                    // TODO: Redirect user to their thread (Needs vue-router)
                    window.location.reload();
                });
            }
        }
    }
</script>

<style scoped>
    #cthread-form {
        margin: 0 auto 10px auto;
        width: 400px;
    }

    textarea {
        resize: none;
    }
</style>