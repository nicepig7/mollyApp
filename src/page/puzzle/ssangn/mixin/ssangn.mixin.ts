import {reactive} from 'vue';
import {useSsangnData} from './ssangn.mixin.data';
import charUtil from './ssangn.mixin.char';
import compareUtil from './ssangn.mixin.cmpr';
import {usePreparation} from './ssangn.mixin.prep';

export function usePageInfo() {
    return {
        data : reactive(useSsangnData()),
        char : charUtil,
        cmpr : compareUtil,
        prep : reactive(usePreparation()),
    }
};