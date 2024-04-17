import {ref} from 'vue';
import $service from '$service';
import {OBJ} from '$util';

export function useScreenMenu() {
    // [DATA] Menu Tree
    let menuTree = ref([] as MenuNode[]);
    // [METHOD] Load menu data(& convert to Tree)
    function loadMenu() {
        $service.comm.menu.get().then(data => {
            menuTree.value = OBJ.listToTree(data);
        });
    }
    return {menuTree, loadMenu}
}
