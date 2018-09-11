<template>
  <div>
    <loading slot="empty" :loading="loading" :data="tableData" :status="status"></loading>
    
  </div>
</template>

<script>

  import loading from '@/components/loading'

  export default {
    data() {
      return {
        loading: false,
        tableData: [],
        status: 0
      }
    },
    components: {
        loading
    },
  }
</script>