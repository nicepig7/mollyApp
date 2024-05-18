<template>
<fdScreen class="home-screen">
    <fdLayout :is-collapse="screen.left.isCollapse">
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
import screenMixin from './mixin';
import leftFrame from './left/fdHome.leftFrame.vue';
import headFrame from './head/fdHome.headFrame.vue';
// [IMPORT] Utils
import {infoKey} from '$key';

export default defineComponent({
    name : 'homeScreen',
    setup() {
        let screen = screenMixin();
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
    ::v-deep(.fd-layout-foot) {border-top:1px solid var(--fd-col-bd-light);}
}
</style>