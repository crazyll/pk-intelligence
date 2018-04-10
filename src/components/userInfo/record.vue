<template>
    <div id="record-div">
        <p>正确率 <span>{{rightRate}}</span></p>
        <p>LastScore <span>{{lastScore}}</span></p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
      ...mapGetters([
          'rightRate',
          'lastScore'
      ])
  }
}
</script>

<style lang="stylus" scoped>
    #record-div
        float: right;
        height: 5rem;
        padding: 1rem;
    
    #record-div p        
        font-size: 1.2rem;
        font-weight: bold;

    #record-div p span 
        color: #FF5722;
        font-size: 1.6rem;
        vertical-align: baseline;
</style>
