<template>
  <div class="c-grail">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
      <div class="c-nav">
      <el-row >
        <el-col :span="8">
          <el-menu default-active="2" theme="dark">
            <el-submenu index="1">
              <template slot="title">导航一</template>
              <el-menu-item-group title="分组一">
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">导航二</el-menu-item>
            <el-menu-item index="3">导航三</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
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
      flex: 0 0 50%;
      min-height: 100%;
    }
  }
}
</style>