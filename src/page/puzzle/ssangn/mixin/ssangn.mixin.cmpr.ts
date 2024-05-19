//                         1      2      3      4      5      6
export const CMPR_ICON = ['🥕', '🍄', '🧄', '🍆', '🍌', '🍎'];

import {getConsonantVowel} from './ssangn.mixin.char';

let cache1 = new Map<string, number>();
let cache2 = new Map<string, number>();
//let cache = new Map<string, Map<string, number>>();

export function solve(input:string, answer:string) {
    //*
    let flag = false;//'거금'===input;
    let rtn = compare(input[0], answer[0], answer[1], flag) * 6
            + compare(input[1], answer[1], answer[0], flag);
    return rtn;
    /*/
    return compare(input[0], answer[0], answer[1]) * 6
         + compare(input[1], answer[1], answer[0]);
    /** */

}
export function compare(ch:string, trg:string, sub:string, flag=false) {
    if(flag) console.log('compare', ch, trg, sub);
    let chArr = null
    // 1. Compare with target array
    // 1.0 Cache
    if(cache1.has(ch+trg)) {
        if(flag) console.log('>> ', ch+trg, cache1.get(ch+trg));
        return cache1.get(ch+trg) || 0;
    } else {
        chArr = chArr || getConsonantVowel(ch);
        let tgArr = getConsonantVowel(trg);
        let tgFirst = tgArr[0];
        // 1.1 Filter n it's length
        let tgFLen = compareArray(chArr, tgArr);
        // 1.2 Return by count
        if(tgFLen === chArr.length && tgFLen === tgArr.length) {
            if(flag) console.log(ch+trg, 0)
            cache1.set(ch+trg,0);
            return 0;           // 0) 당근
        } else if(tgFLen > 1) {
            if(chArr[0] === tgFirst) {
                if(flag) console.log(ch+trg, 1)
                cache1.set(ch+trg,1);
                return 1;       // 1) 버섯
            } else {
                if(flag) console.log(ch+trg, 2)
                cache1.set(ch+trg,2);
                return 2;       // 2) 마늘
            }
        } else if(tgFLen === 1) {
            if(flag) console.log(ch+trg, 3)
            cache1.set(ch+trg,3);
            return 3;           // 3) 가지
        }
    }
    // 2. Check sub array
    // 2.0 Cache
    if(cache2.has(ch+sub)) {
        if(flag) console.log(ch+sub, 4, cache2.get(ch+sub));
        return cache2.get(ch+sub)||0;
    } else {
        chArr = chArr || getConsonantVowel(ch);
        let sbArr = getConsonantVowel(sub);
        let sbFLen = compareArray(chArr, sbArr);
        if(flag) console.error('#>', ch+sub, chArr, sbArr, sbFLen, 4)
        if(sbFLen > 0) {
            // console.warn('#', ch+sub, 4)
            cache2.set(ch+sub,4);
            return 4;           // 4) 바나나
        }
    }
    if(flag) console.warn('#', ch+sub, 5);
    cache2.set(ch+sub,5);
    return 5;               // 5) 사과
}

function compareArray(source:string[], target:string[]){
    let cnt = 0, tClone = target.slice(0,target.length) as (string|null)[];
    for(var i=0, ii=source.length; i<ii ; i++ ){
        for(var j=0, jj=tClone.length; j<jj; j++) {
            if(source[i] === tClone[j]) {
                cnt++;
                tClone[j] = null;
                break;
            }
        }
    }
    return cnt;
}

export default {CMPR_ICON, compare, solve}