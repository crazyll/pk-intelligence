<template>
    <div id="home">        
        <div id="user-div">
            <img v-bind="{src: user.photo}" alt="头像">
            <Record/>
        </div>
        
        <ul class="game-mode">
            <li @click="toRecurit">闯关模式</li>
            <li>好友对战</li>
        </ul>
    </div>
</template>

<script>
import Record from './userInfo/record.vue'

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
    created(){
        console.log("初始化本地数据outer")
        this.$nextTick(function(){
            console.log("初始化本地数据inner")
            this.initData()
        })   
    },
    mounted(){
        console.log("mounted")
    },
    updated(){
        console.log("updated")
    },
    components:{
        Record
    },
    methods: {
        toRecurit() {
            this.$router.push('/recurit')
        },
        initData(){
            if(this.$store.state.personal.lastPerf.score === 0){
                if(localStorage.getItem('personal')){
                    let str = localStorage.getItem('personal')
                    let personal = JSON.parse(str)
                    let state2 = {
                        user: personal.user,
                        lastPerf: personal.lastPerf,
                        sum: personal.sum,
                        rightNo: personal.rightNo
                    }                
                    this.$store.commit('initPersonal', state2)  
                }                                          
            } else {
                if(this.$store.state.personal.user != this.user.userName){
                    console.log("清除缓存")
                    localStorage.clear()
                }                
            }
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
        padding: 20% 8% 2% 8%;
        overflow: hidden;
        line-height: inherit;

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
        margin-top 4rem
    
    .game-mode > li:first-child 
        background lightblue 

    .game-mode>li:last-child
        background pink

</style>


