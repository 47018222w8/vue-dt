<template>
  <el-container class="c-home" style="height:100%">
    <el-aside style="width:auto;">
      <el-menu :collapse="isCollapse" router class="c-nav" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu v-for="(item, index) in menuList" :key="index" :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(son, sIndex) in item.children" @click="toPage(son)" :key="sIndex" :index="son.routePath">
            <i :class="son.icon"></i>{{son.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="c-header">
        <el-dropdown @command="excelExport" v-show="!$route.meta.showBack">
          <el-button type="info" :loading="excelDloading">
            {{excelDloading?'下载中...':'excel导出'}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="doctors">医生-术士</el-dropdown-item>
            <el-dropdown-item command="treatments">术士</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div>
          <el-button v-show="$route.meta.showBack" style="color:#67C23A" type="text" @click="back">返回</el-button>
        </div>
        <div class="c-logout" @click="logout" style="color: #E6A23C;font-size:0.8em;">退出登录</div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import constant from '../components/constant'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isCollapse: false,
        tagList: [],
        menuList: [
          {
            name: '统计',
            icon: 'fas fa-chart-pie',
            children: [
              {
                name: '列表',
                routePath: '/count/list'
              },
              {
                name: '图',
                routePath: '/chart'
              }
            ]
          },
          {
            name: '基础',
            icon: 'fas fa-align-left',
            children: [
              {
                name: '医生',
                routePath: '/doctor/list'
              },
              {
                name: '术士',
                routePath: '/treatment/list'
              }
            ]
          }
        ],
        excelDloading: false
      }
    },
    created() {
    },
    methods: {
      async _initData() {
        await this.$http.get('/menus').then((response) => {
          this.menuList = response.data
        })
      },
      excelExport(name) {
        this.excelDloading = true
        setTimeout(() => {
          this.excelDloading = false
        }, 1500)
        this.$http.get('/relationCounts/excel/' + name).then((response) => {
          window.location.href = response.data
          this.$message({
            message: '下载成功',
            type: 'success',
            duration: 1500
          })
        })
      },
      back() {
        window.history.go(-1)
      },
      logout() {
        localStorage.removeItem(constant.JWT_HEADER)
        this.$router.push({ name: 'login' })
      },
      toPage(menu) {
        let f = true
        for (let m in this.menuList) {
          if (m.id === menu.id) {
            f = false
            break
          }
        }
        f && this.tagList.push(menu)
        this.$router.push({
          name: menu.router
        })
      }
    }
  }
</script>
<style lang="less">
.c-home {
  .c-nav {
    overflow: hidden;
    height: 100%;
    min-width: 200px;
  }
  .c-header {
    .c-collapse:hover {
      cursor: pointer;
    }
    background-color: #eef1f6;
    display: flex;
    align-items: center;
    .el-tag {
      margin-left: 10px;
    }
    justify-content: space-between;
    .c-logout:hover {
      cursor: pointer;
    }
  }
}
</style>