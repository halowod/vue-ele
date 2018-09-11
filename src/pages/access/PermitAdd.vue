<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>权限</el-breadcrumb-item>
            <el-breadcrumb-item>权限添加</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="box-card">
            <el-form v-loading="loading" size="small" :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              
              <el-form-item label="父级" prop="parent_path">
                <el-cascader placeholder="试试搜索" v-model="formData.parent_path" @change="handleChange" :options="options" filterable change-on-select></el-cascader>
              </el-form-item>
              <el-form-item label="权限名称" prop="permit_name">
                <el-input v-model="formData.permit_name"></el-input>
              </el-form-item>
              <el-form-item label="action" prop="permit_action">
                <el-input v-model="formData.permit_action"></el-input>
              </el-form-item>
              <el-form-item label="method" prop="permit_method">
                <el-input v-model="formData.permit_method"></el-input>
              </el-form-item>
              <el-form-item label="禁用" prop="delivery">
                <el-switch v-model="formData.status"></el-switch>
              </el-form-item>
              <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
              </el-form-item>
              <el-form-item>
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
                parent_path: [],
                permit_name: '',
                permit_action: '',
                permit_method: '',
                status: false,
                desc: ''
            },
            rules: {
                parent_path: [ { required: true, message: '请选择父菜单', trigger: 'blur' } ],
                permit_name: [ { required: true, message: '请输入权限名称', trigger: 'blur' } ],
                permit_action: [ { required: true, message: '请输入权限 action', trigger: 'blur' } ],
                permit_method: [ { required: true, message: '请输入权限 method', trigger: 'blur' } ],
            },
            options: [],
          };
        },
        computed: {
            loading: function () {
                return this.$store.getters.getLoading;
            }
        },
        created () {
            this.getPermitView();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    // 入库操作
                    console.log(this.formData.status);
                    this.addPermit();
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },

            handleChange: function(val) {
                console.log(val.join().split(','));
            },
            
            // 添加权限
            addPermit: function() {

                let permit_name = this.formData.permit_name;
                let permit_action = this.formData.permit_action;
                let permit_method = this.formData.permit_method;
                let status = this.formData.status;
                let desc = this.formData.desc;
                let parent_path = this.formData.parent_path.join();

                let data = `{"method":"access.permit.add", "permit_name": "${permit_name}", "permit_action": "${permit_action}", "permit_method": "${permit_method}", "parent_path": "${parent_path}", "status": "${status}", "desc": "${desc}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/permit',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        // 跳转到 列表页
                        this.$message({ showClose: true, message: '添加成功', type: 'success' });
                        this.$router.push({ path: '/permit'});
                    } else {
                        // 提示错误信息
                        this.$message({ showClose: true, message: response.data.message, type: 'error' });
                    }
                    // console.log(status);
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
                        this.options = response.data.data;
                    } else {
                        // 提示错误信息
                        this.$message({ showClose: true, message: response.data.message, type: 'error' });
                    }
                    // console.log(status);
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
