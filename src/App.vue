<template>
    <div id="kamina" class="container">
        <h1 id="board-title">/>p/ - implying we can programming</h1>
        <cthread-form></cthread-form>
        <thread-list></thread-list>
    </div>
</template>

<script>
    import ThreadList from "./Threads/ThreadList.vue"
    import CreateThreadForm from "./Threads/CreateThreadForm.vue"

    export default {
        components: {
            "thread-list": ThreadList,
            "cthread-form": CreateThreadForm
        }
    }
</script>

<style scoped>
    #board-title {
        text-align: center;
    }
</style>