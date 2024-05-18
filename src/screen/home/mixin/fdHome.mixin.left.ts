import {ref} from 'vue';

export function useLeftSide() {
    // [DATA] Collapse flag
    let isCollapse = ref(false);
    // [METHOD] Toggle collapse flag
    function toggleCollapse(flag?:boolean) {
        if(flag === undefined || typeof flag !== 'boolean') {
            isCollapse.value = !isCollapse.value
        } else {
            isCollapse.value = flag;
        }
    }
    return {isCollapse, toggleCollapse}
}

