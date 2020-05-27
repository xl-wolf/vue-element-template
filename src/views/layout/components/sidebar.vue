<template>
  <div id="siderbar">
    <el-menu
      default-active="1-4-1"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="menuStatus"
    >
      <div class="logo-container">
        <img class="img" :src="avatar" />
        <span :title="projectName">{{projectName}}</span>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { getProjectNameSession, getAvatarSession } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  name: 'siderbar',
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
    ...mapGetters(['menuStatus'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
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
  background: #545c64;
  height: 100%;
}
</style>
