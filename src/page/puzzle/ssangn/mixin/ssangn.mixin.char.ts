//                      0 1 2 3 4 5 6 7 8 9 _ 1 2 3 4 5 6 7 8 9 _ 1 2 3 4 5 6 7 8 9 _ 1 2
const CHAR_EL = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
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

const cache = new Map<string, string[]>();

export function getConsonantVowel(ch:string) {
    if(cache.has(ch)) {
        return cache.get(ch) || [];
    }

    // 1. Getting code
    let code = ch.codePointAt(0);
    if(!code) return [];
    if(code<CHAR_FIRST || CHAR_LAST<code) return [];
    let uni = code - CHAR_FIRST;
    // 2. Return value
    let rtn:Array<string> = [];
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

    cache.set(ch, rtn);
//     if(ch==='왓') console.log(rtn)
    return rtn;
}


export default {CHAR_EL, CHAR_EL_F, CHAR_EL_S, CHAR_EL_T
        , getConsonantVowel}