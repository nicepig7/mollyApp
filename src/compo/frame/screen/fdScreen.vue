<template>
<div class="fd-screen">
    <slot></slot>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name : 'fdScreen'
})
</script>

<style scoped lang="scss">
// @see fdFrame.scsss
</style>