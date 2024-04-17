<template>
<RouterLink to="/home/button">Button</RouterLink><br>
<RouterLink to="/home/switch">Switch</RouterLink><br>
<RouterLink to="/home/textField">Text Field</RouterLink>
<div>
    <code pre>{{ menuTree }}</code>
</div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {infoKey} from '$key';
import type {ScreenHome} from '@/common/type/fdType.info';
export default defineComponent({
    name : 'home.leftFrame',
    setup() {
        return {screen : inject(infoKey.screenHome) as ScreenHome}
    },
    computed: {
        menuTree() {
            console.log(this.screen);
            console.log(this.screen.menu);
            console.log(this.screen.menu.menuTree);
            return this.screen.menu.menuTree;
        }
    }
});
</script>