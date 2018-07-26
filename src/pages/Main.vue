<template>
  <div>
  <button v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
  <div>{{incrementGet}}</div>
  

 <a href="">{{hahaha}}</a>



  </div>
</template>

<script>

  export default {
    data() {
      return {
        // hahah123a: this.$store.getters.incrementGetters
      }
    },
    computed: {
      hahaha () {
        return this.$store.state.count
      },
      incrementGet() { return this.$store.getters.incrementGetters }
    },
    props: {
      msg: {
        default: '主要默认区域'
      }
    },
    methods: {    //绑定事件的关键代码
      btnClickEvent: function(){
        this.$store.commit('increment'); // mutations 同步改变
        // this.$store.dispatch('incrementAction') // action 异步更新
        
        console.log(this.$store.getters.count);
      }
    }
  }
</script>