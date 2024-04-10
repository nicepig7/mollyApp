<template>
<div>
    <h1>Hello Ferdy!</h1>
    Hello <RouterLink to="/login">to Login screen</RouterLink>
</div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdHomePage',
})
</script>