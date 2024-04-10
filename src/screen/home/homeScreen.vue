<template>
<fdScreen class="home-screen">
    <fdLayout>
        <template #head>
            <RouterLink to="/home">Header</RouterLink>
        </template>
        <template #left>
            <RouterLink to="/home/button">Button</RouterLink><br>
            <RouterLink to="/home/switch">Switch</RouterLink><br>
            <RouterLink to="/home/textField">Text Field</RouterLink>
        </template>
        <template #foot>Footer</template>
        <template #body>
            <RouterView></RouterView>
        </template>
    </fdLayout>
</fdScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
export default defineComponent({
    name : 'homeScreen',
    components: {RouterView, RouterLink}
})
</script>

<style scoped lang="scss">
.home-screen {
    :deep(.fd-layout-head) {background:#FF000033;}
    :deep(.fd-layout-left) {background:#00FF0033;}
    :deep(.fd-layout-foot) {background:#0000FF33;}
    :deep(.fd-layout-body) {background:#FAFAFA;}
}
</style>