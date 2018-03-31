<template>
    <div id="question-div">
        <h2>第{{curQuestionNo+1}}题</h2>
        <Modal v-if="Boolean(modalText)">{{modalText}}</Modal>
        <section id="question">
            <div class="bfc">
                <h4 id="subject" class="clearfix">{{question.subject}}</h4>  
            </div>                   
            <ul class="item_list">
                <li 
                    class="option_detail"
                    v-for="(item, index) in question.options" 
                    :key="index"
                    v-on:click="chooseId = index"
                >
                    <span 
                        class="option_style" 
                        v-bind:class="{'has_choosed' : index===chooseId}">
                        {{index | chooseOpt}}
                    </span>
                    <span class="answer_style">{{item}}</span>
                </li>
            </ul>
            <button 
            class="nextStepBtn"
            @click="calulateScore(tips, $event)" 
            >{{tips}}</button>
        </section>
        
        
    </div>
</template>

<script>
import Modal from './modal/modal.vue'

export default {
  data() {
      return {
          questions: [
              {id:302, subject:"问题1", options:["选项1选项1选项1选项1选项1选项1", "选项2", "选项3", "选项4"], answer: 3},
              {id:303, subject:"问题2", options:[{"A": "选项1"}, {"B": "选项1"}, {"C": "选项1"}, {"D": "选项1"},], answer: 2},
              {id:304, subject:"问题3", options:[{"A": "选项1"}, {"B": "选项1"}, {"C": "选项1"}, {"D": "选项1"},], answer: 1},
              {id:305, subject:"问题4", options:[{"A": "选项1"}, {"B": "选项1"}, {"C": "选项1"}, {"D": "选项1"},], answer: 3},
              {id:334, subject:"问题5", options:[{"A": "选项1"}, {"B": "选项1"}, {"C": "选项1"}, {"D": "选项1"},], answer: 4},
              {id:376, subject:"问题6", options:[{"A": "选项1"}, {"B": "选项1"}, {"C": "选项1"}, {"D": "选项1"},], answer: 1},
            
            ],
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
  computed: {
      question: function(){
          console.log(this.questions[this.curQuestionNo])
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
      nextQuestion(tips) {    
          this.curQuestionNo++
          this.chooseId = null

          if(tips === "提交"){
            this.$router.push({
                  name: 'pkResult', 
                  params: {scores: this.scores, passNo: this.passNo}
                })
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
            }, 1000)
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
          }, 1000, tips)
        },
        test: async function test() {
            console.log('Hello')
            await this.sleep(1001)
            this.modalText = null
        },
        sleep: function sleep(ms) {
            // return new Promise(resolve => setTimeout(resolve, ms))
            var now = new Date(); 
            var exitTime = now.getTime() + ms; 
            while (true) { 
                now = new Date(); 
                if (now.getTime() > exitTime) 
                    return;
            }
        }
  }
}
</script>

<style lang="stylus" scoped>
    .reddiv{
        background red
        width 100px
        height 20
    }
    #question
        margin-left 30%
        margin-right 30%
        margin-top 5%

    .clearfix:after, .clearfix:before
        content:""; 
        display:table-cell;

    .bfc
        display inline-block
        width 100% 

    #subject
        float left 

    .option_detail{
        text-align left
        margin-top 10px
        list-style-type none
    }
    .option_style
        display: inline-block
        position absolute
        height: 1rem;
        width: 1rem;        
        line-height: 1rem;
        text-align center
        border: 1px solid #000;
        border-radius: 50%;
        font-size: 0.7rem;
        font-family: 'Arial'

    .answer_style
        position relative
        top -3px
        left 30px

    .has_choosed
        background-color #ffd400
        border-color: #ffd400;
        border: 1px solid #ffa400;

    .nextStepBtn
        float right
        margin-top 15px
        padding 0
        width 70px
        height 40px
        border-radius 5px
        background #aaccff
        font-size 1rem
    
</style>
