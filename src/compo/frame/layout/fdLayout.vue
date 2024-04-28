<template>
<div class="fd-layout">
    <!-- BODY : Keep layer bottom-->
    <div class="fd-layout-body">
        <slot name="body"></slot>
    </div>
    
    <div class="fd-layout-head" data-theme="prim">
        <slot name="head"></slot>
    </div>
    <div class="fd-layout-left">
        <slot name="left"></slot>
    </div>
    <div class="fd-layout-foot">
        <slot name="foot"></slot>
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
    $wi-left:320px;
    // [LAYOUT] Default
    .fd-layout {@include mixin.afull;}
    // [LAYOUT] Frame composition
    .fd-layout-head, .fd-layout-left, .fd-layout-foot, .fd-layout-body {
        position:fixed;
    }
    .fd-layout-head {z-index:3; top:0;    left:0;right:0; height:$hi-head;}
    .fd-layout-foot {z-index:2; bottom:0; left:0;right:0; height:$hi-foot;}
    .fd-layout-left {z-index:1; top:$hi-head;bottom:$hi-foot; left:0;  width:$wi-left;}
    .fd-layout-body {z-index:0; top:$hi-head;bottom:$hi-foot; right:0; width:calc(100vw - $wi-left);}
    // [LAYOUT] Head frame
    .fd-layout-head, .fd-layout-left, .fd-layout-foot, .fd-layout-body {
        background: var(--fd-col-bg);
        color: var(--fd-col-ft);
    }
};
</style>