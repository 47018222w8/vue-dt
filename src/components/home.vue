<template>
  <div class="c-grail">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="c-body">
      <el-col :span="8" class="c-nav">
        <el-menu class="c-menu" theme="dark">
          <el-menu-item-group title="统计数据">
            <el-menu-item index="1">
              <i class="el-icon-message"></i>医生术士统计</el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-message"></i>导航二</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="基础数据">
            <el-menu-item @click="toPage('doctorList')" index="3">
              <i class="el-icon-message"></i>医生列表</el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-message"></i>术士列表</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      <div class="c-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="c-footer">
      123
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toPage(path) {
      this.$router.push({
        name: path
      })
    }
  }
}
</script>
<style lang="less">
.c-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .c-header .c-footer {
    flex: 1;
  }
  .c-body {
    display: flex;
    flex: 1;
    min-height: 100%;
    .c-nav {
      flex: 0 0 12%;
      min-height: 100%;
      .c-menu {
        min-height: 100%
      }
    }
    .c-content {
      flex: auto;
      padding-left: 20px;
    }
  }
}
</style>