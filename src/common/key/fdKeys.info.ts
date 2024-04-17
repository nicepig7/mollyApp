import type { InjectionKey } from "vue";
import type { ScreenHome } from "../type/fdType.info"; // 자동으로 안되나요?

let screenHome:InjectionKey<ScreenHome> = Symbol();

export default {
    screenHome
};