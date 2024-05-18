<template>
    <div class="psg-item psgi">
        <div class="psgi-info"></div>
        <div class="psgi-input">
            <!-- <fdTextField class="psgi-field" :value="modelValue" :max="2"/> -->
            <div contenteditable class="psgi-field" :value="inputValue"
                @beforeinput="onBeforeInput" @input="onInput" @keydown="onEnter"></div>
        </div>
        <div class="psgi-result">
            <div class="psgi-result-box psgi-square"></div>
            <div class="psgi-result-box psgi-square"></div>
        </div>
        <div class="psgi-more"></div>
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
    },
    emits: ['update:modelValue', 'enter'],
    setup() {
        return {pageInfo : inject(infoKey.ssangnPage) as SsangnPage}
    },
    data() {return {
        inputValue : '' as string|null,
    }},
    watch : {
        modelValue : {immediate:true, handler(v) {
            console.log('##', v, this.inputValue)
            if(this.inputValue === v) return;
            this.inputValue = v;
        }},
        iconFirst() {}
    },
    methods : {
        // [METHOD] Util, value to icon
        iconner(val:number) {
            // TODO : for only one value <- for history
            let iconArr = this.pageInfo.cmpr.CMPR_ICON;
            return iconArr[~~(val/10)]+iconArr[val%10];
        },
        // [METHOD] Event
        onEnter($e:KeyboardEvent) {
            if($e.key === 'Enter') {
                $e.preventDefault();
                this.$emit('enter', this.inputValue)
            }
        },
        // [METHOD] Event
        onBeforeInput($e:Event) {
            let data = ($e as InputEvent).data || '';
            if(/^[a-zA-Z0-9]$/.test(data)) {
                $e.preventDefault();
            }
        },
        // [METHOD] Event
        onInput($e:Event) {
            // 1. getting value
            let $trg = $e.target as HTMLInputElement;
            if(!$trg) {return;}
            let text = $trg.textContent || ''; // <- ... hmmm
            if(text === this.inputValue) {return;}
            // 3. text.length
            if((text.length) > MAX_LENGTH) {
                this.sliceInput($trg);
                $e.preventDefault();
                return;
            } else {
                this.emitInput(text);
            }
        },
        // [METHOD] Util, DOM, 
        sliceInput($trg: any/*HTMLInputElement*/) {
            // 1. Keep caret postion
            let range = document.createRange();
            let select = window.getSelection();
            range.selectNodeContents($trg);
            let pos = select ? Math.min(select.focusOffset, MAX_LENGTH) : 2;
            // 2. revert to old value
            let text = $trg.textContent || '';
            $trg.textContent = text?.slice(0, MAX_LENGTH);
            this.inputValue = $trg.textContent;
            // 3. revert to old selection
            if(!$trg.firstChild) return;
            range.setStart($trg.firstChild, pos);
            range.setEnd($trg.firstChild, pos)
            if(!select) return;
            select.removeAllRanges();
            select.addRange(range);
            // TODO How to keep isComposing status? 
        },
        // [METHOD] Emit, input(update) event
        emitInput(text:string) {
            this.inputValue = text;
            this.$emit('update:modelValue', text)
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
.psg-item {@include mx.v-mid;gap:$gap*1.5;margin-bottom:16px;}
.psgi-info   {flex:0 0 160px}
.psgi-input  {flex:0 0 $sz*2+$gap;}
.psgi-result {flex:0 0 $sz*2+$gap;}
.psgi-more   {flex:1 1 0;}
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
        font-size:$ft;padding-left:11px;line-height:$sz;}
/*.psgi-field::after {content:'\feff';@include mx.nosel;
    height:100%;display:inline-block;
    vertical-align: middle;// <- It's Hack! for parent v-align.
}/**/ // this hack is replaced with 'line-height:48px;' sxxks
.psgi-field::first-letter {color:red;display:inline-block;margin-right:30px;}
.psgi-field:focus {outline:none;}
.psgi-square {width:$sz;height:$sz;border: 1px solid var(--fd-col-bd);border-radius: tk.$fd-rad-md;}
</style>

