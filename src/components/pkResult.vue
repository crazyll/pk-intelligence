<template>
    <div id="pkResult">
        <div class="result_style">
            <p class="pass_style">答对<span>{{passNo}}</span>道题</p>
            <p class="score_style">共<span>{{score}}</span>分</p>
            <p class="grade_style">{{grade}}</p>
        </div>
        <div id="share_div">
            <span class="share_text">分享给<br/>小伙伴吧</span>
            <img :src="share_cover" class="share_img">
        </div>             
    </div>
  
</template>

<script>
export default {
  name: 'pkResult',
  props: {
    //   score: {
    //       type: Number,
    //       required: true
    //   },
    //   passNo: {
    //       type: Number,
    //       required: true
    //   }
  },
  data() {
      return {
          shareCoverImg: "src/assets/image/share_cover.png"
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
            return "你是小傻子吗"
          }else if(score < 40){
            return "要继续加油哦"
          }else if(score <70) {
            return "恭喜你获得知识小百科称号……^_^"
          }else if(score === 100){
              return "学霸请收下我的膝盖……(￣O￣;)"
          }else{
              return "这么厉害来找朋友PK吧"
          }
      }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
    #share_div
        margin-top 50%

    .share_text
        display inline-block
        background #2196f3f5
        box-shadow 3px 3px 3px lightgray
        color #ff6600
        width 150px
        border-radius 10px
        font-size 1.7rem
        font-weight bolder
        padding 3px



</style>
