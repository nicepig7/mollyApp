<template>
    <div class="puzzle-ssangn-page psg">
        <div class="psg-body">
            <div class="psg-left">
                <div class="psg-title">
                    <span>Answer : {{ answer }}</span>
                    <small v-if="inputMode">Input mode</small>
                </div>
                <fdBlank/>
                <div class="psg-content">
                    <historyItem v-for="item in history" :item="item"></historyItem>
                    
                    <inputItem @enter="onEnter" v-model="value" :input-mode="inputMode"
                            v-if="!solved"></inputItem>
                    <div class="spg-solved" v-else>
                        <fdButton @click="init">Refresh</fdButton>
                    </div>
                    <div class="psg-filtered">
                        <code v-for="text in filtered">{{ text }}</code>
                    </div>
                    <!-- <fdButton @click="hello">Hello</fdButton> -->
                </div>
            </div>
            <div class="psg-right">
                <scoreItem v-for="item in recommand" :item="item" :min="minSugg" :max="maxSugg"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, provide, reactive} from 'vue';
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
        answer : '번개',
        value : '',
        history : [] as SsangnHistory[], // TODO can be move to mixin
        solved : false,
        // --- Flag!
        inputMode : false,
    }},
    computed: {
        minSugg() {return this.recommand.reduce((acc,val) => Math.min(val.entropy, acc), INF)},
        maxSugg() {return this.recommand.reduce((acc,val) => Math.max(val.entropy, acc), 0)},
        recommand() {return this.pageInfo.prep.rating},
        filtered() {return this.pageInfo.prep.filtered.slice(0,20)}
    },
    created() {
        this.init();
    },
    methods: {
        hello() {
            const {prep: PREP, data:DATA, cmpr:CMPR} = this.pageInfo;
            let score = CMPR.solve('망상', '도약');
            console.warn('Hello :', score)
        },
        init(){
            const {prep: PREP, data:DATA} = this.pageInfo;
            this.value = '';
            this.history = [];
            PREP.init(DATA.dataList);
            this.solved = false;
            //---------
            if(!this.inputMode) {
                this.answer = DATA.getRand();
            }
        },
        onEnter(text:string, flag='') {
            console.log('Enter', text, flag)
            this.value = '';
            // need toast!!
            const {prep: PREP, cmpr: CMPR} = this.pageInfo;
            // 1. check exist
            let code = this.pageInfo.data.getIdx(text);
            if(code < 0) {
                console.warn(`없는 단어네요. [${text}]`)
                // return;
            }
            // 2. Solve result
            let score;
            if(this.inputMode) {
                let num = parseInt(flag);
                score = ~~(num/10)*6 + num%10;
                if(!score || score<0 || 35<score) {
                    console.warn(`Score 점수를 입력해주세요.`);
                    return;
                }
                
            } else {
                score = CMPR.solve(text, this.answer);
            }
            
            // 3. Remain?
            let remain = PREP.filtered.length // prev length
              , earned = remain;
            // 4. Update prob
            setTimeout(() => {
                PREP.buildNext(text, score);
                item.earned = PREP.filtered.length; // next length
                console.warn('##.>', text, item)
            })
            // x. add history
            let item = reactive({
                text, score, remain, earned
            })
            this.history.push(item);
            
            if(score === 0) {
                console.warn('##.> 찾았습니다.', text)
                this.solved = true;
            }
        }

    }
});
</script>


<style scoped lang="scss">
@layer page {
    $pad : 30px;
    .puzzle-ssangn-page {background:#222;height:100%;overflow:auto;color:#FFF;
        font-family:"나눔고딕";padding-top:36px;}

    .psg-body {display:flex;gap:$pad;}
    .psg-left {flex:1 1 0;padding-left:$pad;}
    .psg-right {flex: 0 0 400px;padding-right:$pad;}
    // [TITLE]
    .psg-title {font-size:24px;padding:6px;}
    .psg-title small {margin-left:8px;font-size:16px;}
    // [LEFT]
    .spg-solved {margin-left:200px;}
    .psg-filtered {}
    .psg-filtered > code {margin-right:8px;font-size:18px;}
    // [RIGHT]
    .psg-right {padding-top:24px;gap:8px;}


}
</style>

