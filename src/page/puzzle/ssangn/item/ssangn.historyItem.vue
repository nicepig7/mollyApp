<template>
    <div class="psg-item psgi">
        <div class="psgi-info">{{ item.remain }}</div>
        <div class="psgi-input">
            <div class="psgi-input-box psgi-square">{{ text[0] }}</div>
            <div class="psgi-input-box psgi-square">{{ text[1] }}</div>
        </div>
        <div class="psgi-result">
            <div class="psgi-result-box psgi-square">{{ icon0 }}</div>
            <div class="psgi-result-box psgi-square">{{ icon1 }}</div>
        </div>
        <div class="psgi-more"></div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import type {PropType} from 'vue'
import {infoKey} from '$key';
import type {SsangnPage} from '@/common/type/fdType.info';

export default defineComponent({
    name : 'ssangn.item',
    props: {
        item : {type:Object as PropType<SsangnHistory>, default:()=>({})},
    },
    setup() {
        return {pageInfo : inject(infoKey.ssangnPage) as SsangnPage}
    },
    data() {return {
        inputValue : '' as string|null,
    }},
    computed: {
        text()  {return this.item.text},
        score() {return this.item.score},
        icon0() {return this.pageInfo.cmpr.CMPR_ICON[~~(this.score/6)]},
        icon1() {return this.pageInfo.cmpr.CMPR_ICON[this.score%6]},
    },
})
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
$sz : 48px;
$gap: 8px;
$ft : 29px;
// [LAYER]
.psg-item {@include mx.v-mid;gap:$gap*1.5;}
.psgi-info   {flex:0 0 160px}
.psgi-input  {flex:0 0 $sz*2+$gap;}
.psgi-result {flex:0 0 $sz*2+$gap;}
.psgi-more   {flex:1 1 0;}
// [ITEM]
.psgi-input, .psgi-result {display:flex;gap:$gap;height:100%;}
.psgi-square {width:$sz;height:$sz;border: 1px solid var(--fd-col-bd);border-radius: tk.$fd-rad-md;
    font-size:$ft;@include mx.a-mid;}
</style>

