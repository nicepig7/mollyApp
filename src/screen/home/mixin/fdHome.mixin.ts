import {reactive} from 'vue';
import {useScreenMenu} from './fdHome.mixin.menu';
import {useLeftSide} from './fdHome.mixin.left';

export function screenHome() {
    return {
        menu : reactive(useScreenMenu()),
        left : reactive(useLeftSide())
    }
};