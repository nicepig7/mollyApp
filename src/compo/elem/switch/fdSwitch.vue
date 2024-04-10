<template>
<div class="fd-switch fd-elem">
    Check
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdSwitch',
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
    .fd-switch {
        border: 1px solid #ccc;
    }
}
</style>