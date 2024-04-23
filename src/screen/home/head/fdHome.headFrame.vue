<template>
<div class="home-screen-head hsh">
    <div class="hsh__left">
        <RouterLink to="/home">Header</RouterLink>
    </div>
    <div class="hsh__right">
        Hello ferdy
    </div>
</div>
</template>

<style scoped lang="scss">
@use '$mixin' as mx;
.home-screen-head {
    &{height:100%;display:flex;align-items: stretch;}
    .hsh__left, .hsh__right {@include mx.v-mid;flex: 1 1 0;}
    .hsh__right {justify-content: flex-end;}
}
</style>
