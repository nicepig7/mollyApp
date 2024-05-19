const {data : dataList} = require('./data.js');
//const fs = require('node:fs');

const CHAR_EL_F = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const CHAR_EL_S = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
    'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
    'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const CHAR_EL_S_CPX = new Map([
    ['ㅘ',['ㅗ','ㅏ']], 
    ['ㅙ',['ㅗ','ㅐ']], 
    ['ㅚ',['ㅗ','ㅣ']], 
    ['ㅝ',['ㅜ','ㅓ']], 
    ['ㅞ',['ㅜ','ㅔ']], 
    ['ㅟ',['ㅜ','ㅣ']], 
    ['ㅢ',['ㅡ','ㅣ']]]);
const CHAR_EL_T = [
    ''  , 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const CHAR_EL_T_CPX = new Map([
    [''  , []],
    ['ㄳ', ['ㄱ','ㅅ']],
    ['ㄵ', ['ㄴ','ㅈ']],
    ['ㄶ', ['ㄴ','ㅎ']],
    ['ㄺ', ['ㄹ','ㄱ']],
    ['ㄻ', ['ㄹ','ㅁ']],
    ['ㄼ', ['ㄹ','ㅂ']],
    ['ㄽ', ['ㄹ','ㅅ']],
    ['ㄾ', ['ㄹ','ㅌ']],
    ['ㄿ', ['ㄹ','ㅍ']],
    ['ㅀ', ['ㄹ','ㅎ']],
    ['ㅄ', ['ㅂ','ㅅ']],]);
const CHAR_FIRST = 44032;//'가'.codePointAt(0);
const CHAR_LAST  = 55203;//'힣'.codePointAt(0);
const LEN = 20000, DIFF = 1000;


const cache1 = new Map();
const cache2 = new Map();
const cache  = new Map();
const cacheV = new Map();

let rating = buildPrep(dataList.slice(0,LEN));
function buildPrep(list) {
    let _t = new Date().getTime(), _s, _w = _t;
    const SUM = list.length, origin = list;
    let array = origin.map((text, idx) => {
        if(!(idx%DIFF)) {
            _s = new Date().getTime();
            console.log(`Build prep' (${idx/DIFF}/${~~(list.length/DIFF)}) - ${_s-_t} msec (${_s-_w} msec)`);
            _w = _s;
        }

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
        return {text, entropy, map};//
    });
    return array.sort((x,y) => {
        let v = y.entropy - x.entropy;
        if(!!v) return v;
        return (y.map?.at(0)||0) - (x.map?.at(0)||0);
    }).slice(0,20);
}

// OUTPUT
console.log(rating);



//----------- LOCAL
function solve(input, answer) {
    let subCache = cache.get(input);
    // 1. Init cache if empty
    //if(!subCache) {cache.set(input, (subCache = new Map()))};
    if(0&&subCache.has(answer)) {
        // 2. Check if has cache?
        return subCache.get(answer) || 0;
    } else {
        let rtn = compare(input[0], answer[0], answer[1]) * 6
                + compare(input[1], answer[1], answer[0]);
        //subCache.set(answer, rtn);
        return rtn;
    }
}

function compare(ch, trg, sub) {
    let chArr = null
    // 1. Compare with target array
    // 1.0 Cache
    if(cache1.has(ch+trg)) {
        return cache1.get(ch+trg) || 0;
    } else {
        chArr = chArr || getConsonantVowel(ch);
        let tgArr = getConsonantVowel(trg);
        let tgFirst = tgArr[0];
        // 1.1 Filter n it's length
        let tgFLen = compareArray(chArr, tgArr);
        // 1.2 Return by count
        if(tgFLen === chArr.length && tgFLen === tgArr.length) {
            cache1.set(ch+trg,0);
            return 0;           // 0) 당근
        } else if(tgFLen > 1) {
            if(chArr[0] === tgFirst) {
                cache1.set(ch+trg,1);
                return 1;       // 1) 버섯
            } else {
                cache1.set(ch+trg,2);
                return 2;       // 2) 마늘
            }
        } else if(tgFLen === 1) {
            cache1.set(ch+trg,3);
            return 3;           // 3) 가지
        }
    }
    // 2. Check sub array
    // 2.0 Cache
    if(cache2.has(ch+sub)) {
        return cache2.get(ch+sub)||0;
    } else {
        chArr = chArr || getConsonantVowel(ch);
        let sbArr = getConsonantVowel(sub);
        let sbFLen = compareArray(chArr, sbArr);
        if(sbFLen > 0) {
            cache2.set(ch+sub,4);
            return 4;           // 4) 바나나
        }
    }
    cache2.set(ch+sub,5);
    return 5;                   // 5) 사과
}

function compareArray(source, target){
    let cnt = 0, tClone = target.slice(0,target.length);
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



function getConsonantVowel(ch) {
    if(cacheV.has(ch)) {
        return cacheV.get(ch) || [];
    }
    // 1. Getting code
    let code = ch.codePointAt(0);
    if(!code) return [];
    if(code<CHAR_FIRST || CHAR_LAST<code) return [];
    let uni = code - CHAR_FIRST;
    // 2. Return value
    let rtn = [];
    // 2.1 자음
    let fn = ~~(uni/588);
    rtn.push(CHAR_EL_F[fn]);
    // 2.2 모음
    let sn = ~~((uni - fn*588) / 28);
    let chs = CHAR_EL_S[sn], cpsx = CHAR_EL_S_CPX.get(chs);
    if(!!cpsx) {rtn.push(...cpsx)}
    else {rtn.push(chs)}
    // 2.3 받침
    let tn = ~~(uni%28);
    let cht = CHAR_EL_T[tn], cptx = CHAR_EL_T_CPX.get(cht);
    if(!!cptx) {rtn.push(...cptx)}
    else {rtn.push(cht)}
    // x. Return
    cacheV.set(ch, rtn);
    return rtn;
}

function newArray(len=36){
    let rtn = [];
    for(var i=0, ii=len;i<ii;i++) {rtn[i]=0;}
    return rtn;
}