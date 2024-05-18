<template>
    <div class="fd-blank fd-box"></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
const DEFAULT_HEIGHT = 16;

export default defineComponent({
    name : 'fdBlank',
    props: {
        height : {type:[Number,String]},
        h : {type:[Number,String]},
    },
    computed: {
        $h() {
            let val = this.height || this.h;
            if(val === undefined) val = DEFAULT_HEIGHT;
            else val = val || 0;
            if(typeof val === 'string' && isNaN(+val)) {
                return val;
            } else {
                return `${val}px`;
            }
        }
    }
})
</script>


<style>
@layer compo {
    .fd-blank{height:v-bind($h);}
}
</style>