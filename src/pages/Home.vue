<template>
  <el-container class="top-container">
    <el-aside style="width: auto;">
        <div class="logo_left">
            <img v-if="isCollapse === true" src="@/assets/dog_mini.png">
            <img v-else src="@/assets/dog.png">
        </div>
        <el-menu :default-active="$route.path" :unique-opened="uniqueOpened" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">

              <el-menu-item :index="item.redirect" v-if="!item.children" @click="$router.push(item.path)">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>

              <el-submenu :index="item.path" v-if="item.children">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="(child, index1) in item.children" :key="child.name" v-if="!child.hidden" :index="child.path" @click="$router.push(child.path)">{{child.name}}</el-menu-item>
              </el-submenu>
            </template>

        </el-menu>
    </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
        <div class="toggle-left" @click="toggleLeft"><i style="font-size: 22px;" :class="{'icon-outdent': !isCollapse, 'icon-indent': isCollapse}"></i></div>
        <el-dropdown>
          <div class="user-info" style="color: #fff;"><i class="icon-user" style="margin-right: 15px;"></i><span>管理员</span></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
    </el-header>
    
    <el-main>
        <router-view/>
    </el-main>
    <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>

    export default {
    
    data() {
        return {
            isCollapse: false,
            uniqueOpened: true,
        }
    },
    methods: {
        handleOpen: function(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose: function(key, keyPath) {
            console.log(key, keyPath);
        },

        // 切换左侧显示
        toggleLeft: function() {
          if (this.isCollapse == true) {
            this.isCollapse = false
          } else {
            this.isCollapse = true
          }
        },

        // 退出登录
        logout: function() {
            let url = '/logout';

            this.axios({
                method: 'get',
                url: url
            }).then((response)=>{
                
                if (response.data.status == 0) { // 退出成功

                    // 处理  token 信息
                    this.$store.commit('del_token');
                    console.log(this.$store.state);
                    // 跳转到登录页
                    this.$router.push('/login');
                }

            },(response)=>{
                console.log('失败');
            });
            
        }
    },
    components: {
      
    }

  };
</script>

<style scoped>
    .user-info{cursor: pointer; border: none; outline: none;}
    .toggle-left {
      float: left;
      font-size: 22px;
      cursor: pointer;
    }
    .router-link-tag {
      text-decoration: none;
    }
    .logo_left {
        background: linear-gradient(to left, #00A3FB , #0072F3); /* 标准的语法 */
        padding-top: 10px;
        line-height: 50px;
    }
    .top-container {
        border: 1px solid #eee;
        height: 100%;
    }
    .el-header {
        background: linear-gradient(to right, #00A3FB , #0072F3); /* 标准的语法 */
        color: #fff;
        line-height: 60px;
    }

    .radio-group {
        float: left;
        margin-top: 17px;
    }
  
    .el-aside {
        color: #333;
    }

    .el-menu {
        border: none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /*min-height: 400px;*/
        margin-left: -26px;
    }

    .el-main {
      border-left: 1px solid #eee;
    }

    .el-footer {
        color: #333;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
    }
    .el-tag {
        margin-top: 10px;
    }

</style>
