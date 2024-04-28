<template>
<div class="home-screen-head hsh">
    <div class="hsh__left">
        <RouterLink class="hsh__title" to="/home">{{title}}</RouterLink>
    </div>
    <div class="hsh__right">
        <!-- I wanna icon -->
        Hello ferdy
    </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CONST from '$const';

export default defineComponent({
    name : 'fdHome.headFrame',
    computed: {
        // [COMPUTED] Text, Title
        title() {
            return CONST.common.title;
        }
    }
});
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
.home-screen-head {
    // [MISC] Layout
    &{height:100%;display:flex;align-items: stretch;}
    .hsh__left, .hsh__right {@include mx.v-mid;flex: 1 1 0;}
    .hsh__right {justify-content: flex-end;}
    // [MISC] Zone
    .hsh__left {padding-left:tk.$fd-pad-md;}
    // [MISC] Title
    .hsh__title {font-size:20px;font-weight:700;}
}
</style>
