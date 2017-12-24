<template>
    <main>
        <button v-on:click="toggle_thread_form">Make a new thread</button>
        <br><br>
        <cthread-form v-show="mkthread_btn_pressed"></cthread-form>
        <thread-list></thread-list>
    </main>
</template>

<script>
    import ThreadList from "./Threads/ThreadList.vue"
    import CreateThreadForm from "./Threads/ThreadCreateForm.vue"

    export default {
        components: {
            "thread-list": ThreadList,
            "cthread-form": CreateThreadForm
        },
        data() {
            return {
                mkthread_btn_pressed: false
            }
        },
        methods: {
            toggle_thread_form() {
                this.mkthread_btn_pressed = !this.mkthread_btn_pressed;
            }
        }
    }
</script>

<style>

</style>