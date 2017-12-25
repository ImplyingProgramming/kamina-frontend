<template>
    <!-- Use ajax for thread creation -->
    <div id="cthread-form">
        <form>
            <p>
                <label for="cthread-title">Title:</label>
                <input id="cthread-title" type="text" v-model="threadTitle">
            </p>
            <p>
                <label for="cthread-user">Name:</label>
                <input id="cthread-user" type="text" placeholder="Anonymous" v-model="threadUser">
            </p>
            <p>
                <label for="cthread-body">Body:</label>
                <textarea v-model="threadContent" id="cthread-body"></textarea>
            </p>
            <p>
                <label for="cthread-file">File:</label>
                <input accept="image/*" type="file" id="cthread-file" @change="bindFile">
            </p>
        </form>
        <button v-on:click="makeThread">Post</button>
    </div>
</template>

<script>
    import uuid from "uuid"

    export default {
        name: "create-thread-form",
        data() {
            return {
                threadTitle: "",
                threadContent: "",
                threadUser: "",
                threadUploadImage: new FormData()
            }
        },
        methods: {
            makeThread() {
                let threadTitle = this.threadTitle;
                let threadContent = this.threadContent;
                let threadUsername = this.threadUser;
                // We will actually use the thread_id internally
                let threadId = uuid.v4();
                let threadUploadImage = this.threadUploadImage;
                // Accept threads that don't have an image
                if (threadUploadImage.file === undefined) {
                    threadUploadImage.append("file", "");
                }
                threadUploadImage.append("post_id", threadId);
                // First upload the image
                this.$http.post(
                    "http://127.0.0.1:1337/api/upload_image",
                    threadUploadImage
                ).then(uploadImageResp => {
                    // Now we have our image hashes
                    let imgResponse = JSON.parse(uploadImageResp.bodyText);
                    // Create the new thread
                    this.$http.post(
                        "http://127.0.0.1:1337/api/make_thread", {
                            thread_title: threadTitle,
                            thread_content: threadContent,
                            thread_image_info: imgResponse[0],
                            thread_image_hashes: imgResponse[1],
                            thread_username: threadUsername,
                            post_id: threadId
                        }
                    ).then(threadCreationResponse => {
                        // TODO: Redirect user to their thread (Needs vue-router)
                        window.location.reload();
                    }, threadCreationError => {
                        console.error("There was an error creating the thread");
                    });
                }, imageUploadError => {
                    console.error("There was a problem uploading the thread image");
                });
            },
            /**
             * Handle image change on thread creation
             * @param e Event
             */
            bindFile(e) {
                e.preventDefault();
                this.threadUploadImage.set("file", e.target.files[0]);
            }
        }
    }
</script>

<style scoped>
    #cthread-form {
        margin: 0 auto 10px auto;
        width: 300px;
    }

    form {
        display: table;
        border-collapse: separate;
        border-spacing: 5px;
    }

    p {
        display: table-row;
        padding-bottom: 5px;
    }

    label {
        display: table-cell;
    }

    input,
    textarea {
        display: table-cell;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    textarea {
        vertical-align: middle;
        height: 150px;
    }

    button {
        display: block;
        margin: 0 auto;
    }
</style>+++++++