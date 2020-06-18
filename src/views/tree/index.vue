<template>
  <div class="app-main-container" style="display:flex;">
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
    <div id="echarts-3d-map-container" class="echarts-3d-map-container"></div>
  </div>
</template>

<script>
import chinaAreaTree from './chinaProvincesAndCities'
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'
import 'echarts-gl/dist/echarts-gl.min.js'
// 引入柱状图基本配置文件
import mapOpts, { geoCoordMap } from './mapOpts'

import { treeApi, mapProvinceDataApi } from '@/apis/tree'
import { mapGetters } from 'vuex'
import mixins from '../echarts/mixins'

export default {
  mixins:[mixins],
  computed: {
    ...mapGetters(['menuStatus'])
  },
  data() {
    return {
      filterText: '',
      chinaAreaTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandedKeys: [],

      mapEchartsRef: null
    }
  },

  watch: {
    filterText(val) {
      this.$refs.chinaAreaTree.filter(val)
    },
    menuStatus: {
      deep: false,
      immediate: false,
      handler: function(val, oldVal) {
        this.onWindowResize(this.mapEchartsRef)
      }
    }
  },

  mounted() {
    this.loadMapTreeData()
    this.initMapEchart()
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
    handleNodeClick(data, node, value) {
      // console.log(node, data, value)
      if (data.level) {
        this.loadProvinceData(data)
      }
    },
    // ajax请求加载左侧树
    async loadMapTreeData() {
      const resTree = await treeApi()
      this.chinaAreaTreeData = this.treeRecursion(resTree.data)
    },
    // ajax请求加载地图数据
    async loadProvinceData(data) {
      const resProvinceData = await mapProvinceDataApi(data)
      console.log(resProvinceData, geoCoordMap)
      let res = []
      if (resProvinceData.data && resProvinceData.data.length) {
        for (name in geoCoordMap) {
          if (name === resProvinceData.data[0].name) {
            console.log(name)
            res.push({ name: name, value: [...geoCoordMap[name], resProvinceData.data[0].value] })
          }
        }
      }
      console.log(res)
      mapOpts.series[0].data = res
      this.mapEchartsRef.setOption(mapOpts)
    },

    initMapEchart() {
      // 获取echarts容器与其引用
      const mapEchartsContainer = document.getElementById('echarts-3d-map-container')
      this.mapEchartsRef = Echarts.init(mapEchartsContainer)
      // this.generateMapData().then(res => {
      // console.log(res)
      // mapOpts.series = res
      // 使用指定的配置项和数据显示图表
      // console.log(mapOpts)
      this.mapEchartsRef.setOption(mapOpts)
      // })
      window.onresize = this.onWindowResize.bind(null,this.mapEchartsRef)
    }
  }
}
</script>
<style lang="scss">
.tree-container {
  flex: 0 0 200px;
  height: inherit;
  overflow: auto;

  .tree-area {
    height: calc(100% - 60px);
    overflow: auto;
    border-right: 1px solid #efefef;
  }
}
#echarts-3d-map-container {
  margin-left: 10px;
  background: #2b2f3a;
  width: 100%;
  height: 100%;
}
</style>
