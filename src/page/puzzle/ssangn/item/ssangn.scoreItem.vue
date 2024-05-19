<template>
    <div class="psg-score psgs" :class="itemClass">
        <div class="psgs-text">{{ text }}</div>
        <div class="psgs-ratio">{{ ratio }}</div>
        <div class="psgs-bar" :title="tooltip"></div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import type {PropType} from 'vue';
import {infoKey} from '$key';
import type {SsangnPage} from '@/common/type/fdType.info';
export default defineComponent({
    name : 'ssangn.scoreItem',
    setup() {
        return {pageInfo : inject(infoKey.ssangnPage) as SsangnPage};
    },
    props: {
        item :{type:Object as PropType<SsangnSuggest>, required:true},
        min : {type:Number, default:0},
        max : {type:Number, default:5},
    },
    computed: {
        // [COMPUTED] Value, text(0)
        text() {return this.item.text;},
        // [COMPUTED] Value, entropy ratio(0)
        ratio() {return ~~(+this.item.entropy*10000)/10000;}, // TODO round function -> Util
        // [COMPUTED] Value, entropy ratio(0)
        rpx() {
            let min = this.min, max = this.max
              , diff = max-min || 0.01;
            //min -= (max-min)*0.2;
            return `${(this.ratio - min)/diff * 100}%`;
        },
        isTarget() {
            const {prep} = this.pageInfo;
            return prep.filterMap.has(this.text);
        },
        itemClass() {
            let clazz = [];
            if(!this.isTarget) {clazz.push('psg-score--no-target')};
            return clazz;
        },
        tooltip() {
            return this.item.map?.join(',') || '';
        }
    }
})
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
// [LAYOUT]
.psg-score  {@include mx.v-mid;gap:8px;margin-bottom:12px;}
.psg-score--no-target {opacity:0.6;}
.psgs-text  {font-size:18px;flex:0 0 40px;}
.psgs-ratio {font-size:12px;flex:0 0 60px;}
.psgs-bar   {flex: 1 1 0;}
// [BAR]
.psgs-bar {height:18px;border:1px solid var(--fd-col-bd);width:calc(100% - 80px);
    border-radius: tk.$fd-rad-sm;}
.psgs-bar::before {content:'';display:inline-block;
    height:100%;width: v-bind(rpx);
    background:var(--fd-col-bg-prim);}
</style>