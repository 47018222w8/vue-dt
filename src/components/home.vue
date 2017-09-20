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
      <el-menu-item index="3">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>
    <div class="c-body">
      <el-col :span="8" class="c-nav">
        <el-menu class="c-menu" theme="dark">
          <el-submenu index="1">
            <template slot="title">统计数据</template>
              <el-menu-item index="1-1">医生术士统计列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">基础数据</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

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
      flex: 0 0 10%;
      min-height: 100%;
      .c-menu {
        min-height: 100%
      }
    }
  }
}
</style>