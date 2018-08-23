<template>
  <div>
  <button v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
  <div>{{incrementGet}}</div>
  <div>{{hahah123a}}</div>
  

 <a href="">{{hahaha}}</a>
<br>
 <i class="icon-desktop"></i>



  </div>
</template>

<script>

  export default {
    data() {
      return {
        hahah123a: this.$store.getters.incrementGetters
      }
    },
    computed: {
      hahaha () { return this.$store.state.count },
      incrementGet() { return this.$store.getters.incrementGetters }
    },
    props: {
      msg: {
        default: 'home 页面  按钮'
      }
    },
    methods: {
      btnClickEvent: function(){

        // this.$store.commit('increment'); // mutations 同步改变
        this.$store.dispatch('incrementAction'); // action 异步更新
        
        console.log(this.$store.state.user.access_token);
      }


    }
  }
</script>