<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色修改</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="box-card">
            <el-form v-loading="loading" size="small" :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="名称" prop="role_name">
                <el-input v-model="formData.role_name"></el-input>
              </el-form-item>
              <el-form-item label="权限范围" prop="permit_data">
                <el-tree :data="formData.permit_data" show-checkbox node-key="value" ref="tree" @check-change="checkChange" :default-checked-keys="formData.permit_default_checked" :props="defaultProps"></el-tree>
              </el-form-item>
              <el-form-item label="禁用" prop="delivery">
                <el-switch v-model="formData.status"></el-switch>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
  .main{padding: 10px;}
  .breadcrumb { padding-bottom: 10px; border-bottom: solid 1px #eee; }
  .box-card {margin-top: 30px;}
  .demo-ruleForm { width: 30%; }

</style>

<script>
    export default {
        data() {
          return {
            role_id: '',
            formData: {
              role_name: '',
              status: false,
              desc: '',
              permit_data: [],
              permit_default_checked: [],
              permit_checked_keys: []
            },
            rules: {
              role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            },
            defaultProps: {
              children: 'children',
              label: 'label'
            }
          };
        },
        computed: {
            loading: function () {
                return this.$store.getters.getLoading;
            }
        },
        created () {
            this.role_id = this.$route.params.role_id;

            // 渲染角色信息
            this.getRoleInfo();

            // 渲染 权限范围
            this.getPermitView();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    // 异步更新操作
                    this.updateRoel();
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },
            
            // 公共方法 获取角色列表
            updateRoel: function() {

                let role_name = this.formData.role_name;
                let status = this.formData.status;
                let desc = this.formData.desc;
                let permit_checked_keys = this.formData.permit_checked_keys.join();
                
                let data = `{"method":"access.role.update", "role_name": "${role_name}", "role_id": "${this.role_id}", "status": "${status}", "desc": "${desc}", "permit_checked_keys": "${permit_checked_keys}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/role',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        // 跳转到 列表页
                        this.$message({showClose: true, message: '修改成功', type: 'success'});
                        this.$router.push({ path: '/role'});
                    } else {
                        // 提示错误信息
                        this.$message({showClose: true, message: response.data.message, type: 'error'});
                    }

                },(response)=>{
                    console.log('失败');
                });
            },
            getRoleInfo: function() {

                let data = `{"method":"access.role.info", "role_id": "${this.role_id}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/role',
                    data: data
                }).then((response)=>{
                    // console.log(response.data.data);
                    this.formData.role_name = response.data.data.role_name;

                    // string 转 int
                    let strArr = response.data.data.permit_id.split(',');
                    let arr = [];
                    for (var i=0; i < strArr.length; i++) {
                        arr.push(parseInt(strArr[i]));
                    }

                    // 权限范围
                    this.formData.permit_default_checked = arr;
                    this.formData.permit_checked_keys = arr;
                  
                },(response)=>{
                    console.log('失败');
                });
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
                        this.formData.permit_data = response.data.data;
                    } else {
                        // 提示错误信息
                        this.$message({ showClose: true, message: response.data.message, type: 'error' });
                    }
                    // console.log(status);
                },(response)=>{
                    console.log('失败');
                });
            },
            checkChange: function() {
                this.formData.permit_checked_keys = this.$refs.tree.getCheckedKeys();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
