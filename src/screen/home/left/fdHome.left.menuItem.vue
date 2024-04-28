<template>
<div class="hsl__menu-item hslmi" v-fd-click-outside="closeChild">
    <!-- [MENU] Item -->
    <div class="hslmi__item" :class="itemClass" @click.stop="clickMenu">
        <!-- [MENU] Label -->
        <div class="hslmi__label">
            <label v-if="!path">{{ title }}</label>
            <a v-else>{{title}}</a>
        </div>
        <!-- [MENU] Icon -->
        <div lass="hslmi__icon" v-if="hasChild">
            > <!--I need icon -->
        </div>
    </div>
    <!-- [MENU] Children -->
    <div class="hslmi__child" v-if="hasChild" v-show="childFlag">
        <!-- <div code v-for="child in children">{{ child.key }}</div> -->
        <component :is="'fdHome.left.menuItem'" 
                v-for="child in children" :menu="child" @close="closeChild"></component>
    </div>
    
</div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {TIM} from '$util';
export default defineComponent({
    name : 'fdHome.left.menuItem', // fdHome.left.menuItem
    components: {menuItem:{template:'<fdHome.left.menuItem></fdHome.left.menuItem>'}},
    props: {
        menu : {type: Object as PropType<MenuNode>, require:true},
    },
    emits: ['close'],
    data() {return {
        childFlag:false,
    }},
    computed: {
        // [COMPUTED] Value, Title
        title() {return this.menu?.name},
        // [COMPUTED] Value, Path
        path() {return this.menu?.path},
        // [COMPUTED] Value, Path
        children() {return this.menu?.children||[];},
        // [COMPUTED] Flag, hasPath
        hasPath() {return !!this.path;},
        // [COMPUTED] Flag, hasChild
        hasChild() {return !!this.menu?.children.length;},
        // [COMPUTED] Flag, Is curr menu?
        isCurr() {return this.$route.path === this.path;},
        // [COMPUTED] Style, Item Class
        itemClass() {
            return {'hslmi__item--selected':this.isCurr};
        }
    },
    methods : {
        // [METHOD] Event, Click icon
        clickMenu() {
            console.log('Click', this.menu)
            if(this.hasChild) {
                this.childFlag = !this.childFlag;
            }
            if(!!this.path) {
                console.log('GO TO PAth', this.path)
                // can use "hasPath", but typescript does not recognize
                this.$router.push(this.path);
                this.$emit('close');
            }
        },
        // [METHOD] Event, Closed child
        closeChild(this:any){
            if(!this.childFlag) {return;}
            this.$emit('close');
            this.childFlag = false;
        }
    }
})
</script>


<style scoped lang="scss">
@use '$mixin' as mx;
@use '$token' as tk;
// [MENU] Layout
.hsl__menu-item {
    position:relative;height:36px;
}
// [MENU] Item
.hslmi__item {
    @include mx.click;gap:16px;
    @include mx.v-mid;
    height:100%;font-size:16px;
    padding:0 tk.$fd-pad-md;}
// [MENU] Item--selected
.hslmi__item--selected,
.hsl__menu-item:has(.hslmi__item--selected) {
    background:var(--fd-col-bg-selected);color:var(--fd-col-ft-selected);
}
// [MENU] Composition
.hslmi__label {flex: 1 1 0;white-space:nowrap;}
// [CHILD] Children holder
.hslmi__child {
    position:absolute;top:-4px;left:100%;
    padding:tk.$fd-pad-sm 0;
    background:var(--fd-col-bg);border:1px solid var(--fd-col-bd);
}
.hslmi__child {
    .hsl__menu-item {height:28px;}
    .hslmi__item {font-size:14px;}
    .hslmi__child {top:-1px - tk.$fd-pad-sm}
} 
</style>