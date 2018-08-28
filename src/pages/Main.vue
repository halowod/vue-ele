<template>
  <div>
  <button v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
  <div>{{incrementGet}}</div>
  <div>{{hahah123a}}</div>
  <loading :loading="loading" :list="0" :resultCode="200"></loading>
  

 <a href="">{{hahaha}}</a>
<br>
 <i class="icon-desktop"></i>



  </div>
</template>

<script>

  import loading from '@/components/loading'

  export default {
    data() {
      return {
        loading: false,
        hahah123a: this.$store.getters.incrementGetters
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      console.log('这里可以发送http请求');
    },
    components: {
      loading 
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