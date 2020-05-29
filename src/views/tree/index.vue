<template>
  <div class="app-main-container">
    <div class="tree-container">
      <el-input clearable v-model="filterText" placeholder="输入关键字" style="margin-bottom:15px;" />
      <div class="tree-area">
        <el-tree
          ref="chinaAreaTree"
          node-key="id"
          :data="chinaAreaTreeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleNodeClick"
          @node-expand="addExpandedKeys"
          @node-collapse="delExpandedKeys"
        />
      </div>
      <!-- :expand-on-click-node="false" -->
    </div>
  </div>
</template>

<script>
import chinaAreaTree from './chinaProvincesAndCities'
export default {
  data() {
    return {
      filterText: '',
      chinaAreaTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandedKeys: []
    }
  },

  watch: {
    filterText(val) {
      this.$refs.chinaAreaTree.filter(val)
    }
  },

  mounted() {
    this.chinaAreaTreeData = this.treeRecursion(chinaAreaTree)
    console.log(this.chinaAreaTreeData)
  },

  methods: {
    // 树筛选方法
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 递归处理树
    treeRecursion(treeDataParams, level = 0) {
      let cloneTreeDataParams = [...treeDataParams]
      cloneTreeDataParams.forEach((item, index) => {
        item.label = item.nationName || item.provinceName || item.citysName
        item.children = item.provinces || item.citys
        item.id = item.label + index
        item.level = level
        // 第一次展开的树节点
        this.firstExpandTreeNodes(item)

        if (item.children && item.children.length) {
          this.treeRecursion(item.children, level + 1)
        }
      })
      return cloneTreeDataParams
    },
    // 加入展开节点的id
    addExpandedKeys(obj) {
      this.defaultExpandedKeys.push(obj.id)
    },
    // 移除展开节点的id
    delExpandedKeys(obj) {
      this.defaultExpandedKeys.forEach((v, i) => {
        obj.id === v && this.defaultExpandedKeys.splice(i, 1)
      })
    },
    // 第一次展开的树节点
    firstExpandTreeNodes(treeNode, limitLevel = 1) {
      if (treeNode.level < limitLevel) {
        this.defaultExpandedKeys.push(treeNode.id)
      }
    },
    // 树节点点击事件
    handleNodeClick(node, data, value) {
      console.log(node, data, value)
    }
  }
}
</script>
<style lang="scss">
.tree-container {
  width: 200px;
  height: inherit;
  overflow: auto;
  
  .tree-area {
    height: calc(100% - 60px);
    overflow: auto;
    border-right: 1px solid #efefef;
  }
}
</style>
