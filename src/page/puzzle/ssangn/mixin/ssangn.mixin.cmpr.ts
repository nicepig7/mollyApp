//                         1      2      3      4      5      6
export const CMPR_ICON = ['🥕', '🍄', '🧄', '🍆', '🍌', '🍎'];

import {getConsonantVowel} from './ssangn.mixin.char';
export function solve(input:string, answer:string) {
    return compare(input[0], answer[0], answer[1]) * 6
         + compare(input[1], answer[1], answer[0])
}
export function compare(ch:string, target:string, sub:string) {
    let chArr = getConsonantVowel(ch);
    let tgArr = getConsonantVowel(target);
    let tgFirst = tgArr[0];
    // 1. Compare with target array
    // 1.1 Filter n it's length
    let tgFLen = compareArray(chArr, tgArr);
    // 1.2 Return by count
    if(tgFLen === chArr.length && tgFLen === tgArr.length) {
        return 0;           // 0) 당근
    } else if(tgFLen > 1) {
        if(chArr[0] === tgFirst) {
            return 1;       // 1) 버섯
        } else {
            return 2;       // 2) 마늘
        }
    } else if(tgFLen === 1) {
        return 3;           // 3) 가지
    }
    // 2. Check sub array
    let sbArr = getConsonantVowel(sub);
    let sbSet = new Set(sbArr);
    let sbFArr = chArr.filter(x => sbSet.has(x))
      , sbFLen = sbFArr.length;
    if(sbFLen > 0) {
        return 4;           // 4) 바나나
    }
    return 5;               // 5) 사과
}

function compareArray(source:string[], target:string[]){
    let cnt = 0;
    for(var i=0, ii=source.length; i<ii ; i++ ){
        for(var j=0, jj=target.length; j<jj; j++) {
            if(source[i] === target[i]) {
                cnt++;
                target[i] = '';
                break;
            }
        }
    }
    return cnt;
}

export default {CMPR_ICON, compare, solve}