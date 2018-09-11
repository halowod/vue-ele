<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-filter">
            <el-form ref="form" size="mini" :inline="true" :model="formData" class="demo-form-inline">
              <el-form-item label="权限名称">
                <el-input v-model="formData.permit_name" placeholder="权限名称"></el-input>
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
            <el-button size="small" type="primary" @click="addPermit()" icon="el-icon-plus"></el-button>
            <el-button size="small" type="primary" @click="editPermit(0)" icon="el-icon-edit"></el-button>
            <el-button size="small" type="primary" @click="delPermit(0)" icon="el-icon-delete"></el-button>
          </el-button-group>
          <el-button size="small" @click="toggleSelection()">取消选择</el-button>
          <el-button size="small" plain @click="centerDialogVisible = true">权限视图</el-button>
        </div>
        <el-card shadow="hover" class="box-card">
          <el-table ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange">
            
            <el-table-column type="selection" width="55"> </el-table-column>
            
            <el-table-column property="index" label="ID" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column property="permit_name" label="权限名称" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.permit_name }}</span>
                </template>
            </el-table-column>
            <el-table-column property="permit_action" label="Action" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.action }}</span>
                </template>
            </el-table-column>
            <el-table-column property="permit_method" label="Method" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.method }}</span>
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
                    <el-button size="mini" @click="editPermit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="delPermit(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <loading slot="empty" :loading="loading" :data="tableData" :status="status"></loading>
          </el-table>
          
          <div class="pagination">
              <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.total" background> </el-pagination>
          </div>
        </el-card>
        <div class="dialog">
            <el-dialog title="权限视图" :visible.sync="centerDialogVisible" width="30%" center>
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-dialog>
        </div>
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
            centerDialogVisible: false,
            // 表单数据
            formData: {
                permit_name: '',
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
            status: 0,
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
          }
        },
        
        created () {
            this.getPermitList();
            this.getPermitView();
        },

        components: {
            loading
        },

        methods: {
            addPermit: function() {
                this.$router.push({ name: 'permit_add'});
            },
            editPermit: function(id) {
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
                    
                    let permit_id = this.multipleSelection.map(item => item.id).shift();
                    this.$router.push({ name: 'permit_edit', params: { permit_id: permit_id }});
                } else {
                    this.$router.push({ name: 'permit_edit', params: { permit_id: id }});
                }
                
            },

            delPermit: function(id) {

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
                    let permit_ids = '';
                    if (id == 0) {
                        permit_ids = this.multipleSelection.map(item => item.id).join();
                    } else  {
                        permit_ids = id;
                    }
                    
                    let data = `{"method":"access.permit.del", "permit_ids": "${permit_ids}"}`;
                    this.axios({
                            method: 'post',
                            url: '/permit',
                            data: data
                        }).then((response)=>{

                            let status = response.data.status;

                            if (status == 0) {
                                // 跳转到 列表页
                                this.$message({showClose: true, message: '删除成功', type: 'success'});
                                this.getPermitList();
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
                this.getPermitList(page);
            },
            searchSubmit() {
                this.pagination.currentPage = 1;
                this.getPermitList();
            },

            // 公共方法 获取权限列表
            getPermitList: function(page = 1) {
                this.tableData = [];
                this.loading = true;
                
                let permit_name = this.formData.permit_name;
                let start_date = this.formData.start_date;
                let end_date = this.formData.end_date;

                let data = `{"method":"access.permit.list", "permit_name": "${permit_name}", "start_date": "${start_date}", "end_date": "${end_date}", "page": "${page}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/permit',
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
                    console.log('失败');
                });
            },
            showView: function() {
                this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '', {
                  dangerouslyUseHTMLString: true
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
            getPermitView: function() {

                let data = `{"method":"access.permit.view"}`;
                this.axios({
                    method: 'post',
                    url: '/permit',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        response.data.data.shift();
                        this.treeData = response.data.data;
                    } else {
                        // 提示错误信息
                        this.$message({ showClose: true, message: response.data.message, type: 'error' });
                    }
                    // console.log(status);
                },(response)=>{
                    console.log('失败');
                });
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>
