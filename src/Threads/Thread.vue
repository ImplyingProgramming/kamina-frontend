<template>
    <div class="thread">
        <p><strong>{{ data.title }}</strong> <span id="thread-id">{{ data.id }}</span></p>
        <div id="thread_body" v-html="parsed_body"></div>
    </div>
</template>

<script>
    import Response from "../Response.vue"

    export default {
        name: "thread",
        props: ["data"],
        components: {
            "responses": Response
        },
        data() {
            return {
                parsed_body: ""
            }
        },
        mounted() {
            this.parsed_body = this.nl2br(this.$props.data.body);
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
