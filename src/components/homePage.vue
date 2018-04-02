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
                photo: '/static/cat.jpg',
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
        height 100%
        background-image url('../assets/image/blue-station.jpg')
        background-repeat:no-repeat;
        background-size: 100% 100%;

    #user-div
        padding-top  30%;       

    #user-div>img
        width 90px
        height 90px
        border-radius 45px
        border 4px solid lightgray

    .game-mode > li 
        list-style-type none
        border-radius 10px
        line-height 70px
        font-family 'happyfont'
        color #443f35
        letter-spacing 4px
        font-size 30px
        font-weight bold
        width 200px
        height 70px
        margin-left auto 
        margin-right auto 
        margin-top 30px
    
    .game-mode > li:first-child 
        background lightblue 

    .game-mode>li:last-child
        background pink

</style>


