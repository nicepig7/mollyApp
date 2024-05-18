<template>
<div class="home-screen-left hsl" v-if="screen.left.isCollapse">
    <div class="hsl__head__icon" @click="screen.left.toggleCollapse">></div> <!--need ICON-->
</div>
<div class="home-screen-left hsl" v-else>
    <div class="hsl__head">
        <div class="hsl__head__title">Title here</div>
        <div class="hsl__head__icon" @click="screen.left.toggleCollapse"><</div> <!--need ICON-->
    </div>
    <div class="hsl__menu">
        <menuItem v-for="menu in menuTree" :menu="menu"></menuItem>
    </div>
</div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {infoKey} from '$key';
import type {ScreenHome} from '@/common/type/fdType.info';
import menuItem from './fdHome.left.menuItem.vue';
export default defineComponent({
    name : 'home.leftFrame',
    components: {menuItem},
    setup() {
        return {screen : inject(infoKey.screenHome) as ScreenHome}
    },
    computed: {
        menuTree() : MenuNode[] {
            let homeMenu = this.screen.menu.menuTree.find(item => item.key === 'home');
            return !homeMenu? [] : homeMenu.children;
        }
    }
});
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
.home-screen-left {
    $hi-title : 48px;
    // [HEAD] Box
    & {border-right:1px solid var(--fd-col-bd-light);height:100%;}
    // [HEAD] Layout
    .hsl__head {height:$hi-title;display:flex;align-items:stretch;
        padding:0 0 0 tk.$fd-pad-md;}
    .hsl__head__title {flex:1 1 0;@include mx.v-mid;font-size:18px;font-weight:bold;}
    .hsl__head__collapse {flex: 0 0 $hi-title;@include mx.v-mid;}
    .hsl__head__icon {@include mx.a-mid;@include mx.click;
        width:$hi-title;height:$hi-title;font-size:24px;}
    // [HEAD] Menu
    .hsl__menu {height: calc(100% - $hi-title);}
}
</style>