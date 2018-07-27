<template>
    <div class="full-body">
        <div class="login-panel">
            <el-container>
              <el-header class="header">
                  <h2>客户管理系统</h2>
              </el-header>
              <el-container>
                <el-aside width="200px">
                    <img src="@/assets/zc.png">
                </el-aside>
                <el-container>
                  <el-main>
                    <el-input placeholder="用户名" name="username" v-model="name" clearable> </el-input>
                        <el-alert style="margin-top: 5px;" v-if="nameError" title="用户不存在" type="warning" show-icon> </el-alert>
                    <el-input placeholder="密码" name="userpasswd" type="password" v-model="passwd" clearable> </el-input>
                        <el-alert style="margin-top: 5px;" v-if="passwdError" title="密码错误" type="error" show-icon> </el-alert>
                    <div class="login-button-div">
                        <el-button type="primary" size="small" @click="login">登录</el-button>
                        <span class="forget-passwd" @click="">忘记密码</span>
                    </div>
                  </el-main>
                </el-container>
              </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            name: '',
            passwd: '',
            nameError: false,
            passwdError: false,
        }
      
    },
    props: {
      msg: {
        default: '主要默认区域'
      }
    },
    methods: {
        login: function() {
            // console.log(...[1, 2, 3]); return;
            // console.log(this);return;
            // 判断用户输入是否空
            // if (this.name.length == 0) {
            //     this.nameError = true;
            //     return;
            // } else {
            //     this.nameError = false;
            // }

            // if (this.passwd.length == 0 && this.name.length != 0) {
            //     this.passwdError = true;
            //     return;
            // } else {
            //     this.passwdError = false;
            // }

            // 验证用户名 和 密码
            // let url = 'http://axadmin.zhuican.net/model_monitor/home/param';
            let url = '/login';
            // let data = '{"pcid":"4", "cid":"50012097", "model":"JYL-Y99", "brand_value":"joyoung/九阳"}';


            let data = new URLSearchParams();
            data.append('name', 'qinyang');
            data.append('password', '123456');

            this.axios({
                method: 'post',
                url: url,
                data: data
            }).then((response)=>{
                console.log(response.data);//成功回调

                // 处理  token 信息
                this.$store.commit('set_token', response.data.data.access_token);

                // 登陆成功跳转
                if (this.$store.state.user.access_token) {
                    console.log('登录成功');
                    return;
                    this.$router.push('/');
                } else {
                    // 登陆失败
                    this.$router.push('/login');
                }

            },(response)=>{
                console.log('‘失败');
            })

        }
    }
  }
</script>

<style scoped>
    .full-body {
        background: linear-gradient(to right, #00B1FD , #0072F3); /* 标准的语法 */
        height: 100%;
    }
    a {
        text-decoration: none;
    }
    .login-panel {
        border-radius: 4px;
        width: 560px;
        height: 285px;
        margin: auto;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .header {
        border-bottom: 1px #eee solid;
        font-size: 12px;
        line-height: 60px;
    }
    .el-aside {
        line-height: 210px;
    }
    .el-aside img {
        vertical-align: middle;
    }
    .el-main {
        padding: 20px;
    }
    .el-input {
        margin-top: 15px;
    }
    .login-button-div {
        position: relative;
        padding: 15px;
        line-height: 32px;
    }
    .el-button {
        position: absolute;
        left: 2px;
    }
    .forget-passwd {
        position: absolute;
        left: 80px;
        font-size: 14px;
        cursor: pointer;
    }
    .forget-passwd:hover {
        color: #00B1FD;
    }


</style>