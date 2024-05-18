//import {ref} from 'vue';
import dataList from '../data/ssangn.data.list';

export function useSsangnData() {
    // 1. Char set
    // [DATA] 
    let charSet = new Set<string>();
    let idxMap = new Map<string, number>();
    let size = dataList.length;
    // [INIT]
    dataList.forEach((text,idx) => {
        charSet.add(text[0]);
        charSet.add(text[1]);
        idxMap.set(text, idx);
    });
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

