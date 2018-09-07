<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色添加</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="box-card">
            <el-form v-loading="loading" size="small" :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="名称" prop="role_name">
                <el-input v-model="formData.role_name"></el-input>
              </el-form-item>
              <el-form-item label="禁用" prop="delivery">
                <el-switch v-model="formData.status"></el-switch>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
              </el-form-item>              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
            formData: {
              role_name: '',
              status: false,
              desc: ''
            },
            rules: {
              role_name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
              ],
            }
          };
        },
        computed: {
            loading: function () {
                return this.$store.getters.getLoading;
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    // 入库操作
                    console.log(this.formData.status);
                    this.addRoel();
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },
            
            // 添加角色
            addRoel: function() {

                let role_name = this.formData.role_name;
                let status = this.formData.status;
                let desc = this.formData.desc;

                let data = `{"method":"access.role.add", "role_name": "${role_name}", "status": "${status}", "desc": "${desc}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/role',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        // 跳转到 列表页
                        this.$message({
                          showClose: true,
                          message: '添加成功',
                          type: 'success'
                        });
                        this.$router.push({ path: '/role'});
                    } else {
                        // 提示错误信息
                        this.$message({
                          showClose: true,
                          message: response.data.message,
                          type: 'error'
                        });
                    }
                    // console.log(status);
                },(response)=>{
                    console.log('‘失败');
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
