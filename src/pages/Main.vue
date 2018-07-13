<template>
  <div>
  <button v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
  <div>{{incrementGetters}}</div>
  

 <a href="">{{hahaha}}</a>



  </div>
</template>

<script>

  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        hahah123a: this.$store.getters.incrementGetters
      }
    },
    computed: {
      // hahaha () {
      //   return this.$store.state.count
      // }
        ...mapState({
            // 箭头函数可使代码更简练
            hahaha: state => state.count
        }),
        ...mapGetters([
            'incrementGetters'
        ])
    },
    props: {
      msg: {
        default: '主要默认区域'
      }
    },
    methods: {    //绑定事件的关键代码
      btnClickEvent: function(){
        // this.$store.commit('increment'); // mutations 同步改变
        // this.$store.dispatch('incrementAction') // action 异步更新
        


        console.log(this.$store.getters.incrementGetters);
      },
      ...mapMutations({
      btnClickEvent: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
    }
  }
</script>