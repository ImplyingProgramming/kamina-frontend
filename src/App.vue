<template>
    <div id="kamina" class="container">
        <h1 id="board-title">{{ boardLetters }} - {{ boardTitle }}</h1>
        <button v-on:click="toggle_thread_form">Make a new thread</button>
        <br><br>
        <cthread-form v-show="mkthread_btn_pressed"></cthread-form>
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
        },
        data() {
            return {
                mkthread_btn_pressed: false,
                boardLetters: "/>p/",
                boardTitle: "Implying we can programming"
            }
        },
        methods: {
            toggle_thread_form() {
                this.mkthread_btn_pressed = !this.mkthread_btn_pressed;
            }
        }
    }
</script>

<style scoped>
    #board-title {
        text-align: center;
    }
</style>