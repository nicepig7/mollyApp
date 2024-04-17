<template>
<fdScreen class="home-screen">
    <fdLayout>
        <template #head>
            <RouterLink to="/home">Header</RouterLink>
        </template>
        <template #left><leftFrame/></template>
        <template #foot>Footer</template>
        <template #body>
            <RouterView></RouterView>
        </template>
    </fdLayout>
</fdScreen>
</template>

<script lang="ts">
import { defineComponent, provide} from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import screenMenu from './mixin';
import leftFrame from './left/fdHome.leftFrame.vue';
import {infoKey} from '$key';

export default defineComponent({
    name : 'homeScreen',
    setup() {
        let screen = screenMenu();
        provide(infoKey.screenHome, screen);
        return {screen}
    },
    components : {leftFrame},
    mounted() {
        this.screen.menu.loadMenu();
    }
})
</script>


<style scoped lang="scss">
.home-screen {
    :deep(.fd-layout-head) {background:#FF000033;}
    :deep(.fd-layout-left) {background:#00FF0033;}
    :deep(.fd-layout-foot) {background:#0000FF33;}
    :deep(.fd-layout-body) {background:#FAFAFA;}
}
</style>./mixin/homeMixin