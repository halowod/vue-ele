<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-filter">
            <el-form ref="form" size="mini" :inline="true" :model="formData" class="demo-form-inline">
              <el-form-item label="用户名">
                <el-input v-model="formData.user_name" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-col :span="11">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" style="width: 100%" v-model="formData.start_date"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" style="width: 100%" v-model="formData.end_date"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchSubmit">查询</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="operation">
          <el-button-group>
            <el-button size="small" type="primary" @click="addUser()" icon="el-icon-plus"></el-button>
            <el-button size="small" type="primary" @click="editUser(0)" icon="el-icon-edit"></el-button>
            <el-button size="small" type="primary" @click="delUser(0)" icon="el-icon-delete"></el-button>
          </el-button-group>
          <el-button size="small" @click="toggleSelection()">取消选择</el-button>
        </div>
        <el-card shadow="hover" class="box-card">
          <el-table ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange">
            
            <el-table-column type="selection" width="55"> </el-table-column>
            
            <el-table-column property="index" label="ID" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column property="name" label="用户名" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column property="created_at" label="创建时间" width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
                </template>
            </el-table-column>
            <el-table-column property="operate" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editUser(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="delUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <loading slot="empty" :loading="loading" :data="tableData" :status="status"></loading>
          </el-table>
          
          <div class="pagination">
              <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.total" background> </el-pagination>
          </div>
        </el-card>
    </div>
</template>

<style scoped>
    /*.main {padding: 10px;}*/
    .breadcrumb { padding-bottom: 10px; border-bottom: solid 1px #eee; }
    .search-filter, .operation{
        /*border: solid 1px blue;*/
        margin-top: 5px;
        height: 30px;
        padding-top: 10px;
    }
    .operation > *, .search-filter > * {margin-left: 10px;}
    .box-card {margin-top: 15px;}
    .pagination {padding: 10px;}

</style>

<script>
    import loading from '@/components/loading'

    export default {
        data() {
          return {
            // 表单数据
            formData: {
                user_name: '',
                start_date: '',
                end_date: ''
            },
            // 分页数据
            pagination: {
                pageSize: 10, // 每页展示的数量
                total: 3, // 总数量
                currentPage: 1, // 当前页
            },
            multipleSelection: [],
            tableData: [],
            loading: true,
            status: 0
          }
        },
        
        created () {
            this.getUserList();
        },

        components: {
            loading
        },

        methods: {
            addUser: function() {
                this.$router.push({ name: 'user_add'});
            },
            editUser: function(id) {
                if (id ==0 ) {
                    let selectLength = this.multipleSelection.map(item => item.id).length;
                    // 编辑只支持单选
                    if (selectLength == 0) {
                        this.$message({showClose: true, message: '请选择要修改的记录', type: 'warning'});
                        return;
                    }
                    if (selectLength > 1) {
                        this.$message({showClose: true, message: '暂不支持批量修改', type: 'warning'});
                        return;
                    }
                    
                    let user_id = this.multipleSelection.map(item => item.id).shift();
                    this.$router.push({ name: 'user_edit', params: { user_id: user_id }});
                } else {
                    this.$router.push({ name: 'user_edit', params: { user_id: id }});
                }
                
            },

            delUser: function(id) {

                if (id == 0) {
                    let selectLength = this.multipleSelection.map(item => item.id).length;
                    // 检查用户操作
                    if (selectLength == 0) {
                        this.$message({showClose: true, message: '请选择要删除的记录', type: 'warning'});
                        return;
                    }
                }
                
                // confirm 确认
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    // 获取所有要删除的记录编号
                    let user_ids = '';
                    if (id == 0) {
                        user_ids = this.multipleSelection.map(item => item.id).join();
                    } else  {
                        user_ids = id;
                    }
                    
                    let data = `{"method":"access.user.del", "user_ids": "${user_ids}"}`;
                    this.axios({
                            method: 'post',
                            url: '/user',
                            data: data
                        }).then((response)=>{

                            let status = response.data.status;

                            if (status == 0) {
                                // 跳转到 列表页
                                this.$message({showClose: true, message: '删除成功', type: 'success'});
                                this.getUserList();
                            } else {
                                // 提示错误信息
                                this.$message({showClose: true, message: response.data.message, type: 'error'});
                            }

                        },(response)=>{
                            console.log('失败');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

            },
            handleCurrentChange: function(page) {
                this.getUserList(page);
            },
            searchSubmit() {
                this.pagination.currentPage = 1;
                this.getUserList();
            },

            // 公共方法 获取角色列表
            getUserList: function(page = 1) {
                this.tableData = [];
                this.loading = true;
                
                let user_name = this.formData.user_name;
                let start_date = this.formData.start_date;
                let end_date = this.formData.end_date;

                let data = `{"method":"access.user.list", "user_name": "${user_name}", "start_date": "${start_date}", "end_date": "${end_date}", "page": "${page}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/user',
                    data: data
                }).then((response)=>{
                  
                  this.status = response.data.status;
                  if (this.status == 0) {
                    this.tableData = response.data.data.data;
                    this.pagination.pageSize = response.data.data.per_page;
                    this.pagination.total = response.data.data.total;
                  }
                  this.loading = false;

                },(response)=>{
                    console.log('‘失败');
                });
            },
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
