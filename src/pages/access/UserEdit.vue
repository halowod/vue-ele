<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户修改</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="box-card">
            <el-form v-loading="loading" size="small" :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="user_name">
                <el-input v-model="formData.user_name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="禁用" prop="delivery">
                <el-switch v-model="formData.status"></el-switch>
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
          // 表单验证
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

          return {
            user_id: 0,
            formData: {
              user_name: '',
              phone: '',
              pass: '',
              checkPass: '',
              status: false
            },

            rules: {
              user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
              pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
              checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
            }
          };
        },
        computed: {
            loading: function () {
                return this.$store.getters.getLoading;
            }
        },
        created () {
            this.user_id = this.$route.params.user_id;

            this.getUserInfo();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    // 入库操作
                    console.log(this.$route.params.user_id);
                    this.updateUser();
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },
            
            // 公共方法 获取角色列表
            updateUser: function() {

                let user_name = this.formData.user_name;
                let phone = this.formData.phone;
                let checkPass = this.formData.checkPass;
                let pass = this.formData.pass;
                let status = this.formData.status;

                let data = `{"method":"access.user.update", "user_name": "${user_name}", "user_id": "${this.user_id}", "status": "${status}", "phone": "${phone}", "checkPass": "${checkPass}", "pass": "${pass}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/user',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        // 跳转到 列表页
                        this.$message({showClose: true, message: '用户信息修改成功', type: 'success'});
                        this.$router.push({ path: '/user'});
                    } else {
                        // 提示错误信息
                        this.$message({showClose: true, message: response.data.message, type: 'error'});
                    }

                },(response)=>{
                    console.log('失败');
                });
            },
            getUserInfo: function() {

                let data = `{"method":"access.user.info", "user_id": "${this.user_id}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/user',
                    data: data
                }).then((response)=>{
                    // console.log(response.data.data);
                    if (response.data.status == 0) {
                        this.formData.user_name = response.data.data.name;
                        this.formData.phone = response.data.data.phone;
                    } else {
                        // 提示错误信息
                        this.$message(response.data.message);
                    }
                    
                  
                },(response)=>{
                    console.log('失败');
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
