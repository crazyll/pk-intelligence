<template>
    <div id="#modal">
        <div id="modal_body">
            <slot></slot>
        </div>
        <div class="md-overlay">test</div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
    .md-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 200;
    }

    #modal_body
        background #f8aeaf
        box-shadow 2px 2px 3px pink
        position absolute
        width: 200px;
        height auto
        left:50%;
        top 30%
        margin-left -100px;
        padding 10px
        max-height 100px
        border-radius 10px
        z-index 201
</style>
