<template>
    <div class="main">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后台权限</el-breadcrumb-item>
            <el-breadcrumb-item>权限</el-breadcrumb-item>
            <el-breadcrumb-item>权限修改</el-breadcrumb-item>
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
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
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
            permit_id: '',
            formData: {
                parent_path: [0],
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
            this.permit_id = this.$route.params.permit_id;

            // 获取详细信息
            this.getPermitInfo();

            // 获取 父选项
            this.getPermitView();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    // 入库操作
                    console.log(this.$route.params.permit_id);
                    this.updatePermit();
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },
            
            // 公共方法 获取权限列表
            updatePermit: function() {

                let permit_name = this.formData.permit_name;
                let permit_method = this.formData.permit_method;
                let permit_action = this.formData.permit_action;
                
                let status = this.formData.status;
                let desc = this.formData.desc;
                let parent_path = this.formData.parent_path.join();

                let data = `{"method":"access.permit.update", "permit_name": "${permit_name}", "permit_id": "${this.permit_id}", "status": "${status}", "desc": "${desc}", "permit_action": "${permit_action}", "permit_method": "${permit_method}", "parent_path": "${parent_path}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/permit',
                    data: data
                }).then((response)=>{

                    let status = response.data.status;
                    if (status == 0) {
                        // 跳转到 列表页
                        this.$message({showClose: true, message: '修改成功', type: 'success'});
                        this.$router.push({ path: '/permit'});
                    } else {
                        // 提示错误信息
                        this.$message({showClose: true, message: response.data.message, type: 'error'});
                    }

                },(response)=>{
                    console.log('失败');
                });
            },
            getPermitInfo: function() {

                let data = `{"method":"access.permit.info", "permit_id": "${this.permit_id}"}`;
                
                this.axios({
                    method: 'post',
                    url: '/permit',
                    data: data
                }).then((response)=>{
                    // console.log(response.data.data);
                    this.formData.permit_name = response.data.data.permit_name;
                    this.formData.permit_action = response.data.data.action;
                    this.formData.permit_method = response.data.data.method;
                    
                    // string 转 int
                    let strArr = response.data.data.parent_path.split(',');
                    let arr = [];
                    for (var i=0; i < strArr.length; i++) {
                        arr.push(parseInt(strArr[i]));
                    }
                    // arr.push(response.data.data.id);

                    this.formData.parent_path = arr;
                  
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
            handleChange: function(val) {
                console.log(val.join().split(','));
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
