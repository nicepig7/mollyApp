<template>
<div class="fd-button fd-elem" @click="onClick">
    {{ title }}
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdButton',
    computed: {
        // [COMPUTED] 
        title() {
            return "Click me";
        }
    },
    methods : {
        onClick($e:Event) {
            this.$emit('click', $e);
        }
    }
})
</script>

<style scoped lang="scss">
@layer compo {
    .fd-button {
        border: 1px solid #ccc;
    }
}
</style>