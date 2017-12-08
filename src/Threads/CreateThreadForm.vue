<template>
    <!-- Use ajax for form submission -->
    <div id="cthread-form">
        <label for="cthread-title">Title: </label>
        <input id="cthread-title" type="text" v-model="thread_title">
        <br>
        <label for="cthread-body">Body:</label>
        <br><textarea v-model="thread_content" id="cthread-body" cols="30" rows="10"></textarea><br>
        <label for="cthread-file">File:</label>
        <input accept="image/*" type="file" id="cthread-file" @change="bind_file"><br>
        <button v-on:click="make_thread">Create</button>
    </div>
</template>

<script>
    import uuid from "uuid"

    export default {
        name: "create-thread-form",
        data() {
            return {
                thread_title: "",
                thread_content: "",
                thread_upload_image: new FormData()
            }
        },
        methods: {
            make_thread() {
                let thread_title = this.thread_title;
                let thread_content = this.thread_content;
                // We will actually use the thread_id internally
                let thread_id = uuid.v4();
                let thread_upload_image = this.thread_upload_image;
                // Accept threads that don't have an image
                if (thread_upload_image.file === undefined) {
                    thread_upload_image.append("file", "");
                }
                thread_upload_image.append("post_id", thread_id);
                // First upload the image
                this.$http.post(
                    "http://127.0.0.1:1337/api/upload_image",
                    thread_upload_image
                ).then(upload_image_response => {
                    // Now we have our image hashes
                    let img_response = JSON.parse(upload_image_response.bodyText);
                    // Create the new thread
                    this.$http.post(
                        "http://127.0.0.1:1337/api/make_thread", {
                            thread_title: thread_title,
                            thread_content: thread_content,
                            thread_image_info: img_response[0],
                            thread_image_hashes: img_response[1],
                            post_id: thread_id
                        }
                    ).then(thread_creation_response => {
                        // TODO: Redirect user to their thread (Needs vue-router)
                        window.location.reload();
                    }, thread_creation_error => {
                        console.error("There was an error creating the thread");
                    });
                }, image_upload_error => {
                    console.error("There was a problem uploading the thread image");
                });
            },
            /**
             * Handle image change on thread creation
             * @param e Event
             */
            bind_file(e) {
                e.preventDefault();
                this.thread_upload_image.set("file", e.target.files[0]);
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