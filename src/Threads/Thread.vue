<template>
    <div class="thread">
        <template v-if="Object.keys(this.threadInfo['image-info']).length !== 0">
            <div id="image-info">
                File:
                <a :href="image.href" target="_blank">
                    {{ threadInfo["image-info"]["filename"] }}
                </a>
                ({{ image.size }},
                {{ threadInfo["image-info"]["dimensions"] }})
            </div>
            <img id="thread-image" :src="image.src" :class="image.class" @click="toggleSrcAndId">
        </template>
        <p>
            <strong>{{ threadInfo["title"] }}</strong>
            <span id="thread-user">{{ threadInfo.user }}</span>
            <span id="thread-date">{{ threadDate }}</span>
            <span id="thread-id">No.{{ threadInfo["response-id"] }}</span>
            <span>[<router-link :to="replyUrl">Reply</router-link>]</span>
        </p>
        <div id="thread-body" v-html="parsedBody"></div>
        <div style="clear: both;"></div>
    </div>
</template>

<script>
    import Response from "../Response.vue"

    export default {
        name: "thread",
        props: ["thread"],
        components: {
            "responses": Response
        },
        data() {
            return {
                parsedBody: "",
                threadInfo: this.$props["thread"],
                threadDate: "",
                image: {
                    hashes: this.$props["thread"]["image-hashes"],
                    expanded: false,
                    src: "",
                    class: "thread-image-not-expanded",
                    size: "",
                    href: `http://localhost:8080/ipfs/${this.$props["thread"]["image-hashes"]["original"]}`
                },
                replyUrl: `/thread/${this.$props["thread"]["response-id"]}`
            }
        },
        mounted() {
            this.parsedBody = this.nl2br(this.threadInfo["content"]);
            this.image.src = `http://localhost:8080/ipfs/${this.image.hashes["thumbnail"]}`;
            this.image.size = `${parseInt(this.threadInfo["image-info"]["size"])} KB`;
            this.formatThreadDate();
        },
        methods: {
            /**
             * Handle line breaks in the thread body
             * We could probably handle more styling
             */
            nl2br(value) {
                let breakTag = "<br/>";
                return (value + ' ').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
            },
            /**
             * Handle user click on the thread image
             * Change the image thumbnail for the original one
             */
            toggleSrcAndId() {
                this.image.expanded = !this.image.expanded;
                let hash = "";
                if (!this.image.expanded) {
                    hash = this.image.hashes["thumbnail"];
                    this.image.class = "thread-image-not-expanded";
                } else {
                    hash = this.image.hashes["original"];
                    this.image.class = "thread-image-expanded";
                }
                this.image.src = `http://localhost:8080/ipfs/${hash}`;
            },
            /**
             * Set this.threadDate to a string with format
             * mm/dd/yyyy(dayStr)hh:mm:ss
             */
            formatThreadDate() {
                let date = new Date(this.threadInfo["date-created"]* 1000);
                let dateOffset = date.getTimezoneOffset() / 60; // Is this really necessary
                let dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
                this.threadDate =
                    (date.getUTCMonth() + 1) + "/" +
                    date.getUTCDate() + "/" +
                    date.getUTCFullYear() + "(" +
                    dayStrings[date.getUTCDay()] + ")" +
                    (date.getUTCHours() - dateOffset) + ":" +
                    date.getUTCMinutes() + ":" +
                    date.getSeconds();
            }
        }
    }
</script>

<style scoped>
    p {
        margin: 0 !important;
        padding: 0 !important;
    }

    .thread {
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #e1e1e1;
    }

    #thread-id {
        color: gray;
    }

    .thread-image-expanded {
        max-width: 100%;
    }

    .thread-image-not-expanded {
        float: left;
        display: inline-block;
        margin-right: 10px;
    }

    #image-info {
        margin-bottom: 5px;
    }

    #thread-image {
        cursor: pointer
    }
</style>