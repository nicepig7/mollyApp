<template>
<div class="fd-text-field fd-elem">
    Input text
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdTextField',
    computed: {
    },
    methods : {
        onInput($e:Event) {
            this.$emit('input', $e);
        }
    }
})
</script>

<style scoped lang="scss">
@layer compo {
    .fd-text-field {
        border: 1px solid #ccc;
    }
}
</style>