<template>
<div class="fd-layout">
    <div class="fd-layout-head" data-theme="prim">
        <slot name="head"></slot>
    </div>
    <div class="fd-layout-left">
        <slot name="left"></slot>
    </div>
    <div class="fd-layout-foot">
        <slot name="foot"></slot>
    </div>
    <div class="fd-layout-body">
        <slot name="body"></slot>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name : 'fdLayout',
    props: {
        // type
        // fixed footer
        // no left
    }
})
</script>

<style scoped lang="scss">
@use "$mixin" as mixin;
@layer frame {
    // [PREP] Constant
    $hi-head:48px;
    $hi-foot:36px;
    $wi-left:21vw;
    // [LAYOUT] Default
    .fd-layout {@include mixin.afull;}
    // [LAYOUT] Frame composition
    .fd-layout-head {position:fixed;top:0;left:0;right:0;height:$hi-head;}
    .fd-layout-left {position:fixed;top:$hi-head;bottom:$hi-foot;left:0;width:$wi-left;}
    .fd-layout-foot {position:fixed;bottom:0;left:0;right:0;height:$hi-foot;}
    .fd-layout-body {position:fixed;top:$hi-head;bottom:$hi-foot;right:0;width:calc(100vw - $wi-left);}
    // [LAYOUT] Head frame
    .fd-layout-head,
    .fd-layout-left,
    .fd-layout-foot,
    .fd-layout-body {
        background: var(--fd-col-bg);
        color: var(--fd-col-ft);
    }
};
</style>