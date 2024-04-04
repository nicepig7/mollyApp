<template>
<fdScreen class="login-screen">
    <h1>Login Page</h1>
    Hello
    <RouterLink to="/">to Home</RouterLink>
</fdScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {RouterLink} from 'vue-router';
export default defineComponent({
    name : 'loginScreen',
    components: {
        RouterLink
    }
});
</script>

<style scoped lang="scss">
.login-screen {background: #bccff5;}
</style>