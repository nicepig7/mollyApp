export default {
    // [UTIL] Path to Array
    pathToArray(path:String) {
        if(!path) return [];
        return path
            .replace(/^[\/\\]/,'')
            .replace(/[\/\\]$/,'')
            .split(/[\/\\]/);
    }
}