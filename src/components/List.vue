<template>
  <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
        const item = {
            date: '2016-05-02123',
            name: '王小虎123',
            address: '上海市普陀区金沙江路 1518 弄1233'
        };
        return {
            tableData: Array(2).fill(item),
            item: item
        }
    },
    props: {
      msg: {
        default: '下载'
      }
    },
    methods: {    //绑定事件的关键代码
      btnClickEvent: function(){
        alert(this.msg);
      }
    }
  }
</script>