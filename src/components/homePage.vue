<template>
    <div id="home">
        <div id="user-div">
            <img v-bind="{src: user.photo}" alt="头像">
        </div>
        <ul class="game-mode">
            <li @click="toRecurit">闯关模式</li>
            <li>好友对战</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data() {
        return {
            user: {
                userName: '哈酱',
                photo: '/static/1.jpg',
                grade: '100'
            },

        }
    },
    methods: {
        toRecurit() {
            this.$router.push('/recurit')
        }
    }
}
</script>

<style lang="stylus" scoped>
    #home
        padding 20px

    #user-div>img
        width 80px
        height 80px
        border-radius 40px
        border 2px solid rgba(240, 240, 240, 0.7)

    .game-mode > li 
        list-style-type none
        border-radius 10px
        line-height 70px
        font-family '微软雅黑'
        font-size 30px
        font-weight bold
        width 300px
        height 70px
        margin-left auto 
        margin-right auto 
        margin-top 30px
    
    .game-mode > li:first-child 
        background lightblue 

    .game-mode>li:last-child
        background pink

</style>


