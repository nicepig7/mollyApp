<template>
<div class="fd-layout">
    <slot name="head"></slot>
    <slot name="body"></slot>
    <slot name="left"></slot>
    <slot name="foot"></slot>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name : 'fdLayout'
})
</script>

<style scoped lang="scss">
// @see fdFrame.scss
</style>