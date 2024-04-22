<template>
<div>
    <h1>Hello Ferdy!</h1>
    Hello <RouterLink to="/login">to Login screen</RouterLink>
    <br><br>
    <div class="row">
        <div class="box" v-for="n in 9" :class="'grad'+n">{{n}}</div>
    </div>
    <div class="row">
        <div class="box red">R</div>
        <div class="box org">O</div>
        <div class="box yel">Y</div>
        <div class="box gre">G</div>
        <div class="box blu">B</div>
        <div class="box vlt">V</div>
        <div class="box nav">N</div>
    </div>
</div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdHomePage',
})
</script>


<style scoped lang="scss">
@use '$token' as token;
.row {display:flex; gap:10px;}
.box {width:100px;height:100px;
    display:inline-block;margin:10px;}
.red {background: token.$fd-col-red;}
.org {background: token.$fd-col-orange;}
.yel {background: token.$fd-col-yellow;}
.gre {background: token.$fd-col-green;}
.blu {background: token.$fd-col-blue;}
.vlt {background: token.$fd-col-violet;}
.nav {background: token.$fd-col-navy;}


.grad1 {background:color-mix(in srgb, token.$fd-col-red 20%, white)}
.grad2 {background:color-mix(in srgb, token.$fd-col-red 40%, white)}
.grad3 {background:color-mix(in srgb, token.$fd-col-red 60%, white)}
.grad4 {background:color-mix(in srgb, token.$fd-col-red 80%, white)}
.grad5 {background:color-mix(in srgb, token.$fd-col-red 100%, white)}
.grad6 {background:color-mix(in srgb, token.$fd-col-red 80%, black)}
.grad7 {background:color-mix(in srgb, token.$fd-col-red 60%, black)}
.grad8 {background:color-mix(in srgb, token.$fd-col-red 40%, black)}
.grad9 {background:color-mix(in srgb, token.$fd-col-red 20%, black)}

</style>