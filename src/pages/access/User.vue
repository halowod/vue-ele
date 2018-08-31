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
      let data = '{"method":"user.role.list", "cid":"50012097", "model":"JYL-Y99", "brand_value":"joyoung/九阳"}';
        this.axios({
                method: 'post',
                url: '/role',
                data: data
            }).then((response)=>{

              console.log(response.data);

            },(response)=>{
                console.log('‘失败');
            });
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