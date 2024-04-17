// [TYPE] Util, Tree
declare interface TreeNode {
    _isRoot ?: Boolean,
    _isLeaf ?: Boolean,
    _order  ?: Number,
}

// [TYPE] Util, Tree
declare interface Args {
    query ?: any,
}

//------------------------------
// [TYPE] Comm.Menu
declare interface Menu {
    key  : String,
    name : String,
    pid  ?: String,
    path ?: String
}

declare interface MenuNode extends Menu, Tree {};