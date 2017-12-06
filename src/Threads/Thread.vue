<template>
    <div class="thread">
        <img v-bind:src="image_src">
        <p><strong>{{ thread_info.title }}</strong> <span id="thread-id">{{ thread_info.id }}</span></p>
        <div id="thread_body" v-html="parsed_body"></div>
    </div>
</template>

<script>
    import Response from "../Response.vue"

    export default {
        name: "thread",
        props: ["thread_info"],
        components: {
            "responses": Response
        },
        data() {
            return {
                parsed_body: "",
                image: this.$props.thread_info.image ? this.$props.thread_info.image: "",
                image_src: ""
            }
        },
        mounted() {
            this.parsed_body = this.nl2br(this.$props.thread_info.body);
            this.image_src = `http://localhost:8080/ipfs/${this.image.thumbnail_hash}`;
            console.log(this.image_src);
        },
        methods: {
            nl2br(value) {
                let break_tag = "<br/>";
                return (value + ' ').replace(/(\r\n|\n\r|\r|\n)/g, break_tag + '$1')
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

    #thread-id {
        color: gray;
    }
</style>
