<template>
    <div class="thread">
        <div id="image_info">
            File:
            <a v-bind:href="image_href" target="_blank">
                {{ thread_info["image_info"]["filename"] }}
            </a>
            ({{ image_size }},
            {{ thread_info["image_info"]["dimensions"] }})
        </div>
        <img v-bind:src="image_src" v-bind:class="image_class" v-on:click="toggle_src_and_id">
        <p>
            <strong>{{ thread_info["title"] }}</strong>
            <span id="thread_id">No. {{ thread_info["response_id"] }}</span>
        </p>
        <div id="thread_body" v-html="parsed_body"></div>
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
                parsed_body: "",
                thread_info: this.$props["thread"],
                image_hashes: this.$props["thread"]["image_hashes"],
                image_expanded: false,
                image_src: "",
                image_class: "thread_image_not_expanded",
                image_size: "",
                image_href: `http://localhost:8080/ipfs/${this.$props["thread"]["image_hashes"]["original"]}`
            }
        },
        mounted() {
            this.parsed_body = this.nl2br(this.thread_info["content"]);
            this.image_src = `http://localhost:8080/ipfs/${this.image_hashes["thumbnail"]}`;
            this.image_size = `${parseInt(this.thread_info["image_info"]["size"])} KB`
        },
        methods: {
            nl2br(value) {
                let break_tag = "<br/>";
                return (value + ' ').replace(/(\r\n|\n\r|\r|\n)/g, break_tag + '$1')
            },
            toggle_src_and_id() {
                this.image_expanded = !this.image_expanded;
                let hash = "";
                if (!this.image_expanded) {
                    hash = this.image_hashes["thumbnail"];
                    this.image_class = "thread_image_not_expanded";
                } else {
                    hash = this.image_hashes["original"];
                    this.image_class = "thread_image_expanded";
                }
                this.image_src = `http://localhost:8080/ipfs/${hash}`;
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
        padding: 5px;
        background-color: #ebebeb;
        border: 1px solid #bebebe;
    }

    #thread_id {
        color: gray;
    }

    .thread_image_expanded {
        max-width: 100%;
    }

    .thread_image_not_expanded {
        float: left;
        display: inline-block;
        margin-right: 10px;
    }

    #image_info {
        margin-bottom: 5px;
    }
</style>
