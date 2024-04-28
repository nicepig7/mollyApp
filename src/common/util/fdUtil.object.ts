import {cloneDeep} from 'lodash';

export default {
    // [UTIL] Clone
    clone: cloneDeep,
    // [UTIL] List to Tree
    listToTree(list:Array<any>, key='key', pidKey = 'pid') : Array<any&TreeNode> {
        // _isLeaf, _isRoot, _order(?)
        let tree:Array<any&TreeNode> = []
          , map = new Map<any, any>();
        // 1. Build map;
        list.forEach(item => {
            map.set(item[key], item);
            item.children = [];
        });
        // 2. Build tree
        list.forEach(item => {
            let pid = item[pidKey];
            item._isLeaf = item._isLeaf && true;
            item._isRoot = !pid;
            if(!pid) {
                tree.push(item);
            } else {
                let parent = map.get(pid);
                parent._isLeaf = false;
                parent.children = parent.children || [];
                parent.children.push(item);
            };
        })
        return tree;
    }
}