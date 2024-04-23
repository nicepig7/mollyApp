<template>
<fdScreen class="home-screen">
    <fdLayout>
        <template #head>
            <headFrame/>
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
// [IMPORT] Library
import { defineComponent, provide} from 'vue';
import { RouterView, RouterLink } from 'vue-router';
// [IMPORT] Subs
import screenMenu from './mixin';
import leftFrame from './left/fdHome.leftFrame.vue';
import headFrame from './head/fdHome.headFrame.vue';
// [IMPORT] Utils
import {infoKey} from '$key';

export default defineComponent({
    name : 'homeScreen',
    setup() {
        let screen = screenMenu();
        provide(infoKey.screenHome, screen);
        return {screen}
    },
    components : {leftFrame, headFrame},
    mounted() {
        this.screen.menu.loadMenu();
    }
})
</script>


<style scoped lang="scss">
.home-screen {
}
</style>