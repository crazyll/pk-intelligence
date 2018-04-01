<template>
    <div id="pkResult">
        <div class="result_style">
            <p class="pass_style">答对<span class="no_style">{{passNo}}</span>道题</p>
            <p class="score_style">共<span class="no_style">{{score}}</span>分</p>            
        </div>
        <p class="grade_style">{{grade}}</p>
        <div id="share_div" @click="show_cover = true">
            <span class="share_text">分享给<br/>小伙伴吧</span>
        </div>  
        <div class="share_cover" 
            v-if="show_cover" 
            @click="show_cover = false">
        </div>

    </div>
  
</template>

<script>
export default {
  name: 'pkResult',
  data() {
      return {
          shareCoverImg: "src/assets/image/share_cover.png",
          show_cover: false
      }
  },
  computed: {
      passNo() {
          return this.$route.params.passNo
      },
      score() {
          return this.$route.params.scores
      },
      grade() {
          let score = this.$route.params.scores
          console.log(score)
          if(score===0){
            return "你是小傻子吗~"
          }else if(score < 40){
            return "要继续加油哦!"
          }else if(score <70) {
            return "恭喜你获得知识小百科称号……^_^"
          }else if(score === 100){
              return "学霸请收下我的膝盖……(￣O￣;)"
          }else{
              return "这么厉害来找朋友PK吧!"
          }
      }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
    #pkResult
        height 100%
        background-image url("../assets/image/girl-bg.jpg")
        background-repeat no-repeat
        background-position center
        // background-size 100% 100%
        background-size cover

    .result_style  
        padding-top 30%
        font-size 1.5rem
        font-weight 300

    .result_style  p
        letter-spacing 3px

    .no_style
        font-family Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
        font-size 1.7rem
        color rgba(255, 0, 0, 0.7)
    
    .grade_style
        font-size 1.6rem
        margin-top 20%
        font-weight 400
        letter-spacing 2px
        font-family 'happyfont'

    #share_div
        margin-top 10%

    .share_text
        display inline-block
        background rgba(33,150,243,0.961)
        box-shadow 3px 3px 3px lightgray
        width 150px
        border-radius 10px
        font-size 1.7rem
        font-weight bolder
        padding 3px
        font-family 'happyfont'
        color rgba(249, 148, 53, 1)

     .share_cover{
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background gray
        opacity: 0.6;
        background-image url("../assets/image/share_cover.png")
        background-size 100% 50%
        background-repeat no-repeat
        background-position top
    }
        

</style>
