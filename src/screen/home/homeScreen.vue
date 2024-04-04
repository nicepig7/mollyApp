<template>
<fdScreen class="home-screen">
    <h1>Hello Ferdy!</h1>
    Hello
    <RouterLink to="/login">to Login screen</RouterLink>
</fdScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
export default defineComponent({
    name : 'homeScreen',
    components: {RouterLink}
})
</script>