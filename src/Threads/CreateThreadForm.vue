<template>
    <!-- Use ajax for form submission -->
    <div id="cthread-form">
        <label for="cthread-title">Title: </label>
        <input id="cthread-title" type="text" v-model="title">
        <br>
        <label for="cthread-body">Body:</label>
        <br><textarea v-model="body" id="cthread-body" cols="30" rows="10"></textarea><br>
        <label for="cthread-file">File:</label>
        <input accept="image/*" type="file" id="cthread-file" @change="bind_file"><br>
        <button v-on:click="make_thread">Create</button>
    </div>
</template>

<script>
    export default {
        name: "create-thread-form",
        data() {
            return {
                title: "",
                body: "",
                image: new FormData(),
                temp_image: undefined
            }
        },
        methods: {
            make_thread() {
                let thread_title = this.title;
                let thread_body = this.body;
                let thread_image = this.image;
                this.$http.post(
                    "http://127.0.0.1:1337/api/upload_image",
                    thread_image
                ).then(upload_image_response => {
                    let img_json_hashes = JSON.parse(upload_image_response.bodyText);
                    this.$http.post(
                        "http://127.0.0.1:1337/api/make_thread", {
                            title: thread_title,
                            body: thread_body,
                            image: img_json_hashes
                        }
                    ).then(thread_creation_response => {
                        // TODO: Redirect user to their thread (Needs vue-router)
                        window.location.reload();
                    }, error => {
                        console.error("There was an error creating the thread");
                    });
                }, error => {
                    console.error("There was a problem uploading the thread image");
                });
            },
            bind_file(e) {
                e.preventDefault();
                this.image.append("file", e.target.files[0]);
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