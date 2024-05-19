//import {ref} from 'vue';
import dataList from '../data/ssangn.data.list';

export function useSsangnData() {
    // 1. Char set
    // [DATA]
    let codeList = dataList.map(t => [t.codePointAt(0), t.codePointAt(1)]);
    let charSet = new Set<string>();
    let charMap = new Map<string, number>();
    let idxMap  = new Map<string, number>();
    let size = dataList.length;
    // [INIT]
    dataList.forEach((text,idx) => {
        [0,1].forEach(i => {
            let t = text[i]
            charSet.add(t);
            charMap.set(t,(charMap.get(t)||0)+1);
        })
        //charSet.add(text[1]);
        idxMap.set(text, idx);
    });
    //console.log(`[${charSet.size}]`, charSet.keys());
    //let list = Array.from(charMap);
    //list = list.sort((x,y) =>x[1]-y[1]);
    
    // [METHOD] Get index
    function getIdx(text:string) {
        return idxMap.get(text) || -1;
    }
    // [METHOD] Get random text
    function getRand() {
        return dataList[~~(Math.random()*size)];
    }
    return {dataList, charSet, getIdx, getRand}
}

