<template>
<div class="fd-button fd-elem" @click="onClick">
    <slot>{{ title }}</slot>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdButton',
    props: {
        title : {type:String},
    },
    emits : ['click'],
    computed: {},
    methods : {
        onClick($e:Event) {
            this.$emit('click', $e);
        }
    }
})
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
@layer compo {
    .fd-button {
        @include mx.click;
        border: 1px solid var(--fd-col-bd);
        padding:8px 16px;font-size:16px;
        border-radius: tk.$fd-rad-md;
    }
}
</style>