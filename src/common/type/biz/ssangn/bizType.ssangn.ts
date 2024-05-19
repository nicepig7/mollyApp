// [TYPE] Util, Tree
declare interface SsangnHistory {
    text   : string,
    score  : number,
    remain : number,
    earned : number
}


declare interface SsangnSuggest {
    text   : string,
    entropy: number,
    map   ?: number[]
}