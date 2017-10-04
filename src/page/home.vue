<template>
  <el-container style="height:100%">
    <el-aside width="12%">
      <el-col :span="12" class="c-nav">
        <el-menu class="c-nav" default-active="2" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu v-for="(item, index) in menuList" :key="index" :index="index+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(son, sIndex) in item.list" @click="toPage(son)" :key="sIndex" :index="index+'-'+sIndex">
              <i :class="son.icon"></i>{{son.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header class="c-header">
        <el-dropdown @command="excelExport">
          <el-button type="info" :loading="excelDloading">
            {{excelDloading?'下载中...':'excel导出'}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="doctors">医生-术士</el-dropdown-item>
            <el-dropdown-item command="treatments">术士</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      tagList: [],
      menuList: [],
      excelDloading: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData() {
      await this.$http.get('/menus').then((response) => {
        this.menuList = response.data
      })
    },
    closeTag(index) {
      this.tagList.splice(index, 1)
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
.c-nav {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.c-header {
  background-color: #eef1f6;
  display: flex;
  align-items: center;
  .el-tag {
    margin-left: 10px;
  }
}
</style>