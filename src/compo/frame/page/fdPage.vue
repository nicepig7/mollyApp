<template>
<div class="fd-page">
    <h1>{{ $title }}</h1>
    <slot></slot>
</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name : 'fdPage',
    props : {
        title : {type:String}
    },
    computed: {
        // [COMPUTED] Text, Page title
        $title() {
            console.warn(this.$parent, this.$parent?.$.type.name)
            return this.title || this.$parent?.$.type.name || "Page name";
        }
    },
})
</script>

<style>
@layer compo {
    .fd-page {background:#FAFACE;}
}</style>