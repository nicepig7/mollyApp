<template>
    <div class="puzzle-ssangn-page psg">
        <div class="psg-body">
            <div class="psg-left">
                <div class="psg-title">{{ answer }}</div>
                <fdBlank/>
                <div class="psg-content">
                    <historyItem v-for="item in history" :item="item"></historyItem>
                    <inputItem @enter="onEnter" v-model="value"></inputItem>
                </div>
            </div>

            <div class="psg-right">
                <div>{{ value }}</div>
                <scoreItem v-for="item in recommand" :item="item" :min="minSugg" :max="maxSugg"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, provide} from 'vue';
import {usePageInfo} from './mixin';
import {infoKey} from '$key';

import historyItem from './item/ssangn.historyItem.vue';
import inputItem   from './item/ssangn.inputItem.vue';
import scoreItem   from './item/ssangn.scoreItem.vue';

const INF = 99999999; // <- can be const.js or not

export default defineComponent({
    name : 'ssangn.vue',
    components: {historyItem, inputItem, scoreItem},
    setup() {
        let pageInfo = usePageInfo();
        provide(infoKey.ssangnPage, pageInfo);
        return {pageInfo}
    },
    data() {return {
        answer : '가격',
        value : '',
        history : [] as any[], // TODO can be move to mixin
    }},
    computed: {
        minSugg() {return this.recommand.reduce((acc,val) => Math.min(val.entropy, acc), INF)},
        maxSugg() {return this.recommand.reduce((acc,val) => Math.max(val.entropy, acc), 0)},
        recommand() {return this.pageInfo.prep.rating},
        remain() {return this.pageInfo.prep.filtered},
    },
    created() {
        const {data: DATA, prep: PREP} = this.pageInfo;
        // 1. Get random data;
        this.answer = DATA.getRand();
        PREP.init(DATA.dataList);
    },
    methods: {
        onEnter(text:string) {
            // need toast!!
            const {prep: PREP, cmpr: CMPR} = this.pageInfo;
            // 1. check exist
            let code = this.pageInfo.data.getIdx(text);
            if(code < 0) {
                console.warn(`없는 단어네요. [${text}]`)
            }
            // 2. Solve result
            let score = CMPR.solve(text, this.answer);
            // 3. Update prob
            PREP.buildNext(text, score);
            // 4. Remain?
            let remain = PREP.filtered.length;
            // x. add history
            this.history.push({
                text, score, remain
            });
            console.log(this.history);
            this.value = '';
        }

    }
});
</script>


<style scoped lang="scss">
@layer page {
    $pad : 30px;
    .puzzle-ssangn-page {background:#222;height:100%;overflow:auto;color:#FFF;}

    .psg-body {display:flex;gap:$pad;}
    .psg-left {flex:1 1 0;padding-left:$pad;}
    .psg-right {flex: 0 0 400px;padding-right:$pad;}
    // [TITLE]
    .psg-title {font-size:24px;padding:6px;}
    // [RIGHT]
    .psg-right {padding-top:24px;gap:8px;}
}
</style>

