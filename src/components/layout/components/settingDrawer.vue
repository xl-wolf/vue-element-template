<template>
  <el-drawer
    :visible.sync="visible"
    :direction="direction"
    :show-close="false"
    :before-close="handleClose"
    :with-header="false"
  >
    <div class="setting-header">
      <span>系统设置</span>
      <i class="el-icon-close" style="cursor:pointer" @click="handleClose"></i>
    </div>
    <div class="setting-body">
      <ul>
        <li>
          <span class="label">主题色配置</span>
          <div class="values">
            <div
              v-for="item in primaryColorList"
              :key="item"
              class="item"
              :style="{'background-color':item}"
              @click="changePrimaryColor(item)"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  </el-drawer>
</template>

<script>
import scss from '@/styles/variables.scss'
console.log(scss)
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      primaryColorList: ['#00c78c', '#228b22', '#ffd04b', '#67C23A', '#7e46f2', '#24a9f4']
    }
  },
  methods: {
    handleClose() {
      this.$emit('beforeDrawerClose')
    },
    changePrimaryColor(PC) {
      console.log(scss)
      scss.primaryColor = PC
    }
  }
}
</script>

<style lang='scss'>
@import '~@/styles/variables.scss';
.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20px;
  font-size: 16px;
  transition: 0.7s;
  & .el-icon-close:hover {
    color: $primary-color;
  }
}
.setting-body {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin-left: 20px;
      margin-right: 20px;
      border-bottom: 1px dashed #e8e8e8;
      display: flex;
      .label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
      .values {
        display: flex;
        align-items: center;
        margin-left: 14px;
        overflow: scroll;
        width: calc(100% - 84px);
        .item {
          width: 30px;
          height: 30px;
          min-width: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
