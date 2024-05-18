import type { InjectionKey } from "vue";
import type { ScreenHome, SsangnPage } from "../type/fdType.info"; // 자동으로 안되나요?

let screenHome:InjectionKey<ScreenHome> = Symbol();
let ssangnPage:InjectionKey<SsangnPage> = Symbol();

export default {
    // Screen Key
    screenHome,
    // PageInfo Key
    ssangnPage
};