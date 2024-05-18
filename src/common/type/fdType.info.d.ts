// [TYPE] Screen home
import {screenHome} from '@/screen/home/mixin/fdHome.mixin';
type tScreenHome = ReturnType<typeof screenHome>;
declare interface ScreenHome extends tScreenHome {};


import {usePageInfo as ssangnPage} from '@/page/puzzle/ssangn/mixin';
type tSsangnPage = ReturnType<typeof ssangnPage>;
declare interface SsangnPage extends tSsangnPage {};
