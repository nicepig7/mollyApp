<template>
    <div class="psg-item psgi" :class="itemClass">
        <div class="psgi-info">
            <span>{{ remain }} </span>
            <small>{{ entropy }} bits</small>
        </div>
        <div class="psgi-input">
            <!-- <fdTextField class="psgi-field" :value="modelValue" :max="2"/> -->
            <div contenteditable class="psgi-field" :value="inputValue" ref="input"
                @beforeinput="onBeforeInput" @input="onInputValue" @keydown="onEnter"></div>
        </div>
        <div class="psgi-result">
            <div class="psgi-result-box psgi-square">{{ iconFirst }}</div>
            <div class="psgi-result-box psgi-square">{{ iconSecond }}</div>
            <div contenteditable class="psgi-score" :value="scoreValue" ref="score" v-if="inputMode"
                    @beforeinput="onBeforeScore" @input="onScoreValue" @keydown="onEnter"></div>

        </div>
        <div class="psgi-more">{{ inputValue }} </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {infoKey} from '$key';
import type {SsangnPage} from '@/common/type/fdType.info';
const MAX_LENGTH = 2; // <- 위치는 여기가 좋지 않습니다.
export default defineComponent({
    name : 'ssangn.item',
    props: {
        modelValue : {type:String},
        inputMode  : {type:Boolean, default:false},
    },
    emits: ['update:modelValue', 'enter'],
    setup() {
        return {pageInfo : inject(infoKey.ssangnPage) as SsangnPage}
    },
    data() {return {
        inputValue : null as string|null,
        scoreValue : null as string|null,
    }},
    computed: {
        remain()  {return this.pageInfo.prep.filtered.length},
        entropy() {return ~~(-Math.log2(1/this.remain)*100)/100},
        iconFirst() {
            if(!this.scoreValue) return '';
            let number = parseInt(this.scoreValue[0]), {cmpr} = this.pageInfo;
            console.log('##', number, cmpr.CMPR_ICON[number]);
            return cmpr.CMPR_ICON[number] || '';
        },
        iconSecond(){
            if(!this.scoreValue) return '';
            let number = parseInt(this.scoreValue[1]), {cmpr} = this.pageInfo;
            console.log('$$', number, cmpr.CMPR_ICON[number]);
            return cmpr.CMPR_ICON[number] || '';
        },
        itemClass() {
            return {'psg-item--input-mode':this.inputMode}
        }
    },
    watch : {
        modelValue : {immediate:true, handler(v) {
            if(this.inputValue === v) return;
            this.inputValue = v;
            this.scoreValue = '';
            let $trg = this.$refs.input as HTMLElement
              , $srg = this.$refs.score as HTMLElement;
            if(!!$trg) $trg.textContent = v;
            if(!!$srg) $srg.textContent = v;
        }},
    },
    methods : {
        // [METHOD] Event
        onEnter($e:KeyboardEvent) {
            if($e.key !== 'Enter') {return}
            $e.preventDefault();
            if(this.inputMode) {
                this.$emit('enter', this.inputValue, this.scoreValue);
            } else {
                this.$emit('enter', this.inputValue)
            }
        },
        // [METHOD] Event
        onBeforeInput($e:Event) {
            let data = ($e as InputEvent).data || '';
            if(/^[a-zA-Z0-9]$/.test(data)) {$e.preventDefault();}
        },
        // [METHOD] Event
        onBeforeScore($e:Event) {
            let data = ($e as InputEvent).data || '';
            if(/^[6-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]$/.test(data)) {$e.preventDefault();}
        },
        // [METHOD] Event
        onInputValue($e:Event) {
            let text = this.onInput($e);
            this.inputValue = text;
            this.$emit('update:modelValue', text)
        },
        // [METHOD] Event
        onScoreValue($e:Event) {
            let text = this.onInput($e);
            this.scoreValue = text;
        },
        // [METHOD] Util
        onInput($e:Event) {
            // 1. getting value
            let $trg = $e.target as HTMLInputElement;
            if(!$trg) {return;}
            // 3. text.length
            return this.sliceInput($trg);
        },
        // [METHOD] Util, DOM, 
        sliceInput($trg: any/*HTMLInputElement*/) {
            // 1. revert to old value
            let text = $trg.textContent || '';
            if(text.length <= MAX_LENGTH ) {return text;}
            // 1. Keep caret postion
            let range = document.createRange();
            let select = window.getSelection();
            range.selectNodeContents($trg);
            let pos = select ? Math.min(select.focusOffset, MAX_LENGTH) : 2;
            setTimeout(() => {
                // 3. revert to old selection
                if(!$trg.firstChild) return;
                range.setStart($trg.firstChild, pos);
                range.setEnd($trg.firstChild, pos)
                if(!select) return;
                select.removeAllRanges();
                select.addRange(range);
            })
            return text?.slice(0, MAX_LENGTH);
        }
    }
})
</script>

<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
$sz : 48px;
$gap: 8px;
$ft : 29px;
// [LAYER]
.psg-item {@include mx.v-mid;gap:$gap*1.5;margin-bottom:24px;}
.psgi-info   {flex:0 0 160px}
.psgi-input  {flex:0 0 $sz*2+$gap;}
.psgi-result {flex:0 0 $sz*2+$gap;}
.psgi-more   {flex:1 1 0;}
// [INFO]
.psgi-info {display:flex;align-items:baseline;}
.psgi-info span {flex:0 0 60px;text-align:right;margin-right:8px;font-size:18px;}
.psgi-info small{flex:0 0 60px;text-align:right;}
// [ITEM]
.psgi-input, .psgi-result {display:flex;gap:$gap;height:100%;}
.psgi-input {position:relative;height:$sz;}
.psgi-input::before, .psgi-input::after {
    content:''; @extend .psgi-square;position:absolute;
    pointer-events:none;
}
.psgi-input::before {left:0;}
.psgi-input::after {right:0;}
.psgi-input:has(.fd-text-field__input:focus) {
    &::before, &::after {border-color:var(--fd-col-bd-prim);}
}
.psgi-field {width:100%;height:100%;border:none;color:var(--fd-col-ft-inverse);
        font-size:$ft;padding-left:10px;line-height:$sz;}
/*.psgi-field::after {content:'\feff';@include mx.nosel;
    height:100%;display:inline-block;
    vertical-align: middle;// <- It's Hack! for parent v-align.
}/**/ // this hack is replaced with 'line-height:48px;' sxxks
.psgi-field::first-letter {color:red;display:inline-block;margin-right:26.5px;}
.psgi-field:focus, .psgi-score:focus {outline:none;}
.psgi-square {width:$sz;height:$sz;border: 1px solid var(--fd-col-bd);border-radius: tk.$fd-rad-md;
        pointer-events:none;font-size:$ft;@include mx.a-mid;}
// [MODE] Input Mode
.psgi-result {position:relative}
.psg-item--input-mode {
    .psgi-score  {@include mx.afull;position:absolute;opacity:0.3;}
}
</style>

