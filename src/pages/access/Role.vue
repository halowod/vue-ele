<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">后台权限</a></el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            <el-breadcrumb-item>角色详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-filter">
          <el-input size="small" v-model="value1" placeholder="角色名称" style="width: 150px;"></el-input>
          <el-date-picker size="small" v-model="value1" type="date" placeholder="开始时间"></el-date-picker>
          <el-date-picker size="small" v-model="value1" type="date" placeholder="结束时间"></el-date-picker>
          <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="operation">
          <el-button-group>
            <el-button size="small" type="primary" icon="el-icon-plus"></el-button>
            <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="small" type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
          <el-button size="small" @click="toggleSelection()">取消选择</el-button>
        </div>
        <div class="data-list">
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="date" label="日期" width="120"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
          </el-table>
          <div class="pagination ">
              <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
          </div>
        </div>
    </div>
</template>

<style scoped>
  .main{padding: 10px;}
  .breadcrumb {

  }
  .search-filter, .operation{
    /*border: solid 1px blue;*/
    margin-top: 5px;
    height: 30px;
    padding-top: 10px;
    clear: both;
  }
  .operation > *, .search-filter > * {margin-left: 10px;}
  .data-list {border: solid 1px #eee; margin-top: 15px;}
  .pagination {padding: 10px;}

</style>

<script>
  export default {
    data() {
      return {
        value1: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    
    created () {
      let data = '{"method":"access.role.list", "cid":"50012097", "model":"JYL-Y99", "brand_value":"joyoung/九阳"}';
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

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>