import {ref} from 'vue';
import {solve} from './ssangn.mixin.cmpr';
import dataList from '../data/ssangn.data.list';

const INIT_RATING : SsangnSuggest[] = [
    { text: '관원', entropy: 4.086432993532524 },
    { text: '관장', entropy: 4.030532978485395 },
    { text: '관상', entropy: 4.027701712900873 },
    { text: '간원', entropy: 4.019291323876135 },
    { text: '관망', entropy: 4.006440269647233 },
    { text: '관성', entropy: 4.004203081024033 },
    { text: '광원', entropy: 3.9993176017550303 },
    { text: '관종', entropy: 3.991050852316088 },
    { text: '낙원', entropy: 3.975513718221052 },
    { text: '환원', entropy: 3.974488601123755 },
    { text: '관중', entropy: 3.9742947576954237 },
    { text: '관운', entropy: 3.9689283278617022 },
    { text: '강원', entropy: 3.963668585641588 },
    { text: '감원', entropy: 3.9564341341453546 },
    { text: '만원', entropy: 3.9561584917774124 },
    { text: '외관', entropy: 3.9503804554777475 },
    { text: '왕권', entropy: 3.946381004776951 },
    { text: '간언', entropy: 3.9419684561036954 },
    { text: '공원', entropy: 3.94078048721497 },
    { text: '황권', entropy: 3.9391483062333386 }
]; // update 2024-05-19

export function usePreparation() {
    // [DATA] 
    //    CAUTION! will be empty until first match
    let filtered = ref([] as string[]);
    let filterMap = ref(new Set<string>());
    const rating   = ref([] as SsangnSuggest[]);
    // [METHOD]
    function init(list:string[]) {
        filtered.value = list;
        //prepMap.value = [];
        //probMap.value = [];
        rating.value = INIT_RATING;
        console.log('Initialize ', list.length)
    }
    function buildNext(text:string, score:number) {
        let _t = getTime(), _s = _t, _w = _t;
        let list = filterList(text, score);
        _s = getTime();console.log('1. filter', `${_s-_t}msec (${_s-_w}msec)`);_w = _s;
        let sugg = buildPrep(list, dataList);
        _s = getTime();console.log('2. prep/prob/sugg', `${_s-_t}msec (${_s-_w}msec)`);_w = _s;
        // set!
        filtered.value = list;
        rating.value = sugg;
        function getTime() {return new Date().getTime();}
    }
    function filterList(text:string, score:number) {
        let list = filtered.value.filter(next => {
            let val = solve(text, next);
            return val === score;
        });
        filterMap.value = new Set(list);
        return list;
    }
    function buildPrep(list:string[], origin:string[]) {
        const SUM = list.length;
        let array = origin.map((text) => {
            let map = newArray();
            list.forEach(target => {
                let score = solve(text, target);
                map[score]++;
            })
            let entropy = map.reduce((acc, val) => {
                if(!val) return acc;
                let p = val/SUM;
                return acc - p*Math.log2(p);
            }, 0);
            return {text, entropy, map} as SsangnSuggest;
        });

        return array.sort((x,y) => {
            let v = y.entropy - x.entropy;
            if(!!v) return v;
            return (y.map?.at(0)||0) - (x.map?.at(0)||0);
        }).slice(0,20);
    }
    return {filtered, filterMap, rating, init, buildNext};
}


function newArray(len=36){
    let rtn = [];
    for(var i=0, ii=len;i<ii;i++) {rtn[i]=0;}
    return rtn;
}