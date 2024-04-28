// [TYPE] Util, Tree
declare interface TreeNode {
    _isRoot ?: boolean,
    _isLeaf ?: boolean,
    _order  ?: number,
    children : Array<MenuNode>
}

// [TYPE] Util, Tree
declare interface Args {
    query ?: any,
}

//------------------------------
// [TYPE] Comm.Menu
declare interface Menu {
    key  : string,
    name : string,
    pid  ?: string,
    path ?: string
}

declare interface MenuNode extends Menu, TreeNode {};