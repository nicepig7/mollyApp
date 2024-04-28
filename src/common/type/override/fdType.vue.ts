import type { Directive } from "vue";

declare global {
    export type FdDirective = Directive & {name : string};
}