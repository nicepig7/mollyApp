export default {
    // [UTIL] Clone
    clone(obj:any) {
        // TODO - DO NOT USE JSON.stringify!!!
        //    maybe lodash?
        return JSON.parse(JSON.stringify(obj));
    },
    // [UTIL] List to Tree
    listToTree(list:Array<any>, key='key', pidKey = 'pid', childKey= 'children') {
        // _isLeaf, _isRoot, _order(?)
        let tree:Array<any&TreeNode> = [], map = new Map<String, any>();
        // 1. Build map;
        list.forEach(item => {
            map.set(item[key], item);
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
                parent[childKey] = parent[childKey] || [];
                parent[childKey].push(item);
            };
        })
        return tree;
    }
}