const dataList = require('./data.js');
const fs = require('node:fs');

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
const LEN = 20000;
let prep = buildPrep(dataList.data.slice(0,LEN));
function buildPrep(list) {
    let _t = new Date().getTime(), _s, _w = _t;
    let map = list.map((text, idx) => {
        if(!(idx%200)) {
            _s = new Date().getTime();
            console.log(`Build prep' (${idx/200}/${~~(list.length/200)}) - ${_s-_t} msec`);
            _t = _s;
        }
        return list.map(target => {
            //console.log('##', text, target)
            return compare(text[0], target[0], target[1])*6
                 + compare(text[1], target[1], target[0]);
        });
    });
    console.log(`time(build) : ${new Date().getTime() - _w} msec`)
    return map;
}


let _t = new Date().getTime(), _s;
let diff = ~~(LEN/10000)*1000;
for(var i=0, ii=prep.length; i*diff < ii; i++) {
    let path = `./ssangn.data.prep-${i}.json`;
    console.log('write file :', path, `(${prep.length})`)
    let split = prep.slice(i*diff,(i+1)*diff);
    //if(!!split.length) return;
    console.log('write file :', i*diff, split.length, ii);
    (function(arr) {
        let file = fs.createWriteStream(path);
        file.on('close', ()=>{
            _s = new Date().getTime();
            console.log(`write file(${_s-_t} msec) :`, split.length, arr.length);
            _t = _s;
        })
        file.write('[');
        arr.forEach(async (line, idx) => {
            if(idx !== 0) file.write('\n,');
            file.write(JSON.stringify(line));
        });
        file.write(']');
        file.end();
    })(split);
}







function compare(ch, target, sub) {
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

function compareArray(source, target){
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



function getConsonantVowel(ch){
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
    return rtn;
}
