<template>
    <div id="question-div">
        <h2>第{{curQuestionNo+1}}题</h2>
        <Modal v-if="Boolean(modalText)">{{modalText}}</Modal>
        <section id="question">
            <h4 id="subject">{{question.subject}}</h4>       
            <ul class="item_list">
                <li 
                    class="option_detail"
                    v-for="(item, index) in question.options" 
                    :key="index"
                    v-on:click="chooseId = index"
                    v-bind:class="{'has_choosed' : index===chooseId}"
                >
                    <span class="option_style">
                        {{index | chooseOpt}}
                    </span>
                    <p class="answer_style">{{item}}</p>
                </li>
            </ul>
            <p 
            class="nextStepBtn"
            @click="calulateScore(tips, $event)" 
            >{{tips}}</p>
        </section>
        
        
    </div>
</template>

<script>
import Modal from './common/modal.vue'
import axios from 'axios'
import fs from 'fs'
import {logError} from '../utils/log.js'

export default {    
  data() {
      return {
            questions: [],
            curQuestionNo: 0, //当前回答第几题
            chooseId: null,
            scores: 0,
            passNo: 0,
            modalText: null
      }
  },
  components: {
    Modal,
  },
  beforeCreate: function() {
    this.$nextTick(function() {
       this.initData()
    })
  },
  computed: {     
      question: function(){
          console.log(this.questions.length)
          if(this.questions.length == 0){
              return {subject:"", options:[], answer: 0}
          }
          return this.questions[this.curQuestionNo]
      },
      tips: function(){
          return this.questions.length == this.curQuestionNo+1 ? '提交': '下一题'            
      }
     
  },
  filters: {
      chooseOpt: function(index){
          return String.fromCharCode(index+'A'.charCodeAt())
        }
  },
  methods: {
      initData() {
          axios.get('/questions')
            .then((response) => {
                this.questions = response.data
            })
            .catch((error) => {
                console.log(error);//输出错误日志到控制台
                logError('ERR',error);//上传错误日志到服务端
                this.getLocalData();
            });
      },
    //   从json文件获取题目
      getLocalData(){
          axios.get('/static/questions.json')
            .then((response) => {
                console.log("get "+ response)
                this.questions = response.data
            })
            .catch((error) => {
                console.log(error);//输出错误日志到控制台
                logError('ERR',error);//上传错误日志到服务端                
            });
      },
      nextQuestion(tips) {    
          this.curQuestionNo++
          this.chooseId = null

          if(tips === "提交"){
            var perf = {
                right: this.passNo, 
                sum: this.questions.length,          
                score: this.scores
                }
            this.$store.commit('recordScore', perf)
            this.$router.push('/pkResult')
          }     
      },
      hideModal() {
          this.modalText = ""
          
      },
      calulateScore(tips, event) {
          event.stopPropagation()
          var that = this
          if(this.chooseId === null){
              this.modalText = "你还没有选择答案哦～"
              setTimeout(function(){
                  that.hideModal()
                  }, 800)
              return
          } else if(this.chooseId === this.questions[this.curQuestionNo].answer){              
              this.scores = this.scores+10
              this.passNo++
              this.modalText = "回答正确"
          } else if(this.chooseId != this.questions[this.curQuestionNo].answer){
              let anw =  String.fromCharCode(this.questions[this.curQuestionNo].answer+'A'.charCodeAt())
              this.modalText = "回答错误，正确答案为"+anw            
          }
          setTimeout(function(){
              that.hideModal()
              that.nextQuestion(tips)
          }, 800, tips)
        }
  }
}
</script>

<style lang="stylus" scoped>
    #question-div
        height 100% 
        background-image url("../assets/image/fly.jpg")
        background-repeat no-repeat
        background-position center
        background-size 100% 100%

    #question-div > h2
        padding-top 20%
        font-family 'happyfont'
        color #f38686

    .reddiv{
        background red
        width 100px
        height 20
    }
    #question
        margin-left 15%
        margin-right 15%
        margin-top 5%

    .clearfix:after, .clearfix:before
        content:""; 
        display:table-cell;

    #subject
        text-align  left 

    .item_list
        margin-top 10px

    .option_detail{
        text-align left
        list-style-type none
        font-weight 420
        padding 8px

    }
    .option_style
        display table-cell
        height: 1rem;    
        line-height: 1rem;
        text-align center
        font-size: 0.7rem;
        font-family: 'happyfont'
        font-weight bold

    .answer_style
        display table-cell
        padding-left 0.5rem

    .has_choosed
        background: linear-gradient( #e8dce6 5%, rgb(239, 131, 143) 40%,rgb(247, 206, 212) 90%, #f9d2d4 95%);
        border-radius 0.5rem


    .nextStepBtn
        float right
        margin-top 15px
        font-size 1.3rem
        font-family 'happyfont'
        color #0a6af9
        text-shadow 1px 2px 1px gray
    
</style>
