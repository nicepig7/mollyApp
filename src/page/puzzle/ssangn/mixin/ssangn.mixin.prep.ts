import {ref} from 'vue';
import {solve} from './ssangn.mixin.cmpr';

const INIT_RATING : SsangnSuggest[] = [
    {text:'공상', entropy:3.831380253509962},
    {text:'공장', entropy:3.8261608682919928},
    {text:'송장', entropy:3.8145285944115335},
    {text:'종상', entropy:3.8139378497466887},
    {text:'간장', entropy:3.8026939881867383},
    {text:'공산', entropy:3.7954950979164166},
    {text:'곤장', entropy:3.789623358274956},
    {text:'산장', entropy:3.7804635023494226},
    {text:'종강', entropy:3.7750239374487244},
    {text:'동상', entropy:3.7740454699428914},
    {text:'동장', entropy:3.7689058598425884},
    {text:'인상', entropy:3.7675590361857543},
    {text:'공방', entropy:3.7654350577456315},
    {text:'인장', entropy:3.7634203091628624},
    {text:'반상', entropy:3.7626715766125636},
    {text:'몽상', entropy:3.760337222682463},
    {text:'온상', entropy:3.759500060830515},
    {text:'산정', entropy:3.75899423660922},
    {text:'동산', entropy:3.756676326649542},
    {text:'잔상', entropy:3.7556088110070114}];

export function usePreparation() {
    // [DATA] 
    //    CAUTION! will be empty until first match
    const filtered = ref([] as string[]);
    const prepMap  = ref([[]] as number[][]); // skip calc at first
    const probMap  = ref([[]] as number[][]); // skip calc at first
    const rating   = ref([] as SsangnSuggest[]);
    // [METHOD]
    function init(list:string[]) {
        filtered.value = list;
        prepMap.value = [];
        probMap.value = [];
        rating.value = INIT_RATING;
    }
    function buildNext(text:string, score:number) {
        filterList(text, score);
        buildPrep();
        buildProb();
        buildSugg();
    }
    function filterList(text:string, score:number) {
        filtered.value = filtered.value.filter(next => solve(text, next) === score);
    }
    function buildPrep() {
        prepMap.value = filtered.value.map(text => {
            return filtered.value.map(target => solve(text, target));
        });
    }
    function buildProb() {
        probMap.value = prepMap.value.map(line => {
            let lineArray = newArray();
            line.forEach(x => lineArray[x]++);
            return lineArray;
        });
    }
    function buildSugg() {
        const SUM = filtered.value.length;
        let array : SsangnSuggest[] = probMap.value.map((x, i) => {
            let sum = 0;
            x.forEach(v => {
                if(!v) return;
                let ratio = v/SUM;
                let entropy = -Math.log2(ratio)
                sum += ratio*entropy;
            })
            return {text: filtered.value[i], entropy : sum};
        });
        array = array.sort((x,y) => y.entropy - x.entropy);
        array = array.slice(0,20);
        array.forEach((x,i) => console.log(x)); //?
        rating.value = array; 
    }
    return {filtered, prepMap, rating, init, buildNext};
}


function newArray(len=36){
    let rtn = [];
    for(var i=0, ii=len;i<ii;i++) {rtn[i]=0;}
    return rtn;
}