<template>
<div class="fd-text-field fd-elem">
    <input class="fd-text-field__input" v-model="modelValue"/>
    <!-- <div contenteditable class="fd-text-field__input" :value="modelValue" @input="onInput"
            :maxlength="max"/> 
        아직 contenteditable을 다룰정도는 아닌갑다.-->
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name : 'fdTextField',
    props:{
        modelValue : {type:String},
        max        : {type:Number},
    },
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
@use '$token' as tk;
@layer compo {
    .fd-text-field {
        border: 1px solid var(--fd-col-bd);
        border-radius:tk.$fd-rad-md;}
    .fd-text-field__input {width:100%;height:100%;
        color:inherit;font-size:inherit;}
        //white-space:pre;text-overflow:ellipsis;
}
</style>