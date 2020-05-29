<template>
  <div id="siderbar">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenuItem"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="menuStatus"
    >
      <!-- 侧边栏顶部logo和项目名称 -->
      <div class="logo-container">
        <img class="img" :src="avatar" />
        <span :title="projectName">{{projectName}}</span>
      </div>
      <!-- 左侧菜单栏 -->
      <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <recursionMenu :menuTree="menuTree" />
      <!-- </el-scrollbar> -->
    </el-menu>
  </div>
</template>

<script>
import { getProjectNameSession, getAvatarSession } from '@/utils/index'
import { mapGetters } from 'vuex'
import recursionMenu from './recursionMenu'
import { routes } from '@/router'

export default {
  name: 'siderbar',
  components: { recursionMenu },
  data() {
    return {}
  },
  computed: {
    avatar() {
      return getAvatarSession()
    },
    projectName() {
      return getProjectNameSession()
    },
    ...mapGetters(['menuStatus', 'activeMenuItem']),
    menuTree() {
      let menuTree = []
      routes.forEach(menu => {
        if (menu.children && menu.children.length) {
          menuTree.push(...menu.children)
        }
      })
      return menuTree.sort((a, b) => {
        return a.sort - b.sort
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss">
#siderbar {
  .el-menu {
    border: 0;
    .logo-container {
      height: 60px;
      line-height: 60px;
      padding: 0 14px;
      background: #2b2f3a;
      white-space: nowrap;
      .img {
        position: relative;
        top: -12px;
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
      span {
        width: calc(100% - 44px);
        font-size: 14px;
        font-weight: 700;
        display: inline-block;
        white-space: nowrap;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
      }
    }
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  background: #545c64;
  height: 100%;

}
</style>
