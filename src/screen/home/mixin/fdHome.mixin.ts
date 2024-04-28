import {reactive} from 'vue';
import {useScreenMenu} from './fdHome.mixin.menu';

export function screenHome() {
    return {
        menu : reactive(useScreenMenu())
    }
};