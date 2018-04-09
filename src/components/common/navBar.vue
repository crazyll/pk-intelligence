<template>
  <div id="navbar" @click="backToHome()">
      <p class="back-icon"></p><span>Back</span>
  </div>
</template>

<script>
export default {
  methods: {
      backToHome(){
          this.$router.push('/home')
      }
  }
}
</script>

<style lang="stylus" scoped>
    #navbar
        position absolute
        top: 2rem
        left: 2rem
    
    .back-icon
        display inline-block
        width 1rem
        height 1rem
        border-left 4px solid #0000009c 
        border-bottom 4px solid #0000009c 
        transform-origin current
        transform rotate(45deg)
        -webkit-transform rotate(45deg)        
    
    span:nth-of-type(1)
        font-size 1.5rem
        color #0000009c 
        font-weight bold
</style>


