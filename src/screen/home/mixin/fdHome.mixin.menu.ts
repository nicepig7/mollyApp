import {ref} from 'vue';
import $service from '$service';
import {OBJ} from '$util';

export function useScreenMenu() {
    // [DATA] Menu Tree
    let menuTree = ref([] as MenuNode[]);
    let menuMap = new Map<string, MenuNode>();
    // [METHOD] Load menu data(& convert to Tree)
    function loadMenu() {
        $service.comm.menu.get().then(data => {
            // 1. Getting menu
            let tree : MenuNode[] = OBJ.listToTree(data);
            menuTree.value = tree;
            // 2. Make root map
            tree.forEach(menu => {
                
                menuMap.set(menu.key, menu);
            });
            console.log('menuLoaded');
        });
    }
    // [METHOD] Get menu
    function getMenu(key:string) {
        console.log(menuMap, key, menuMap.get(key))
        console.log(menuMap.keys())
        return menuMap.get(key);
    }
    return {menuTree, loadMenu, getMenu}
}

