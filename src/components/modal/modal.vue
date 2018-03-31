<template>
    <div id="modal">
        <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
    #modal
        background rgba(251, 163, 223, 0.9)
        box-shadow 3px 3px 3px lightblue
        position absolute
        width: 200px;
        left:50%;
        margin-left -100px;
        padding 10px
        max-height 100px
        border-radius 10px
</style>