<template>
    <div class="thread">
        <p><strong>{{ data.title }}</strong> <span id="thread-id">{{ data.id }}</span></p>
        <p>{{ data.body }}</p>
    </div>
</template>

<script>
    import Response from "../Response.vue"

    export default {
        name: "thread",
        props: ["data"],
        components: {
            "responses": Response
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
