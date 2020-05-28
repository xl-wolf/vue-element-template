<template>
  <div id="listArea" :style="{height:itemHeight+10+'px'}">
    <div id="scrollArea" class="swiper-list">
      <div
        v-for="(item,index) in list"
        :key="index"
        :style="{width:itemWidth+'px',height:itemHeight+'px',marginRight:index<list.length-1?itemGap+'px':'0px'}"
        class="swiper-item"
      >
        <slot :item="item" />
      </div>
    </div>
    <div
      v-show="iconShow&&leftClickCount>0"
      class="swiper-icon swiper-icon--left"
      :class="[iconScale]"
      @click="handleLeftIconClick"
    >
      <i class="el-icon-arrow-left" />
    </div>
    <div
      v-show="iconShow&&leftClickCount<dynamicNum"
      class="swiper-icon swiper-icon--right"
      :class="[iconScale]"
      @click="handleRightIconClick"
    >
      <i class="el-icon-arrow-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperClass',
  props: {
    // 列表源数据
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 列表项宽度
    itemWidth: {
      type: [Number, String],
      default: ''
    },
    // 列表项高度
    itemHeight: {
      type: [Number, String],
      default: ''
    },
    // 列表项间距
    itemGap: {
      type: [Number, String],
      default: ''
    },
    // 左右切换箭头大小large,normal,small,
    iconScale: {
      type: [String],
      default: 'small'
    }
  },
  data() {
    return {
      iconShow: true,
      orderListPosition: 0,
      leftClickCount: 0,
      rightClickCount: 0,
      dynamicNum: 0
    }
  },
  mounted() {
    this.hasIcon()
    window.addEventListener('resize', () => {
      this.hasIcon()
    })
  },
  methods: {
    handleRightIconClick() {
      this.leftClickCount++
      this.rightClickCount--
      const translateDistance = (this.itemWidth + this.itemGap) * this.leftClickCount
      document.getElementById('scrollArea').style.left =
        this.orderListPosition - translateDistance + 'px'
    },
    handleLeftIconClick() {
      this.rightClickCount++
      this.leftClickCount--
      const translateDistance = (this.itemWidth + this.itemGap) * this.rightClickCount
      document.getElementById('scrollArea').style.left =
        this.orderListPosition + translateDistance + 'px'
    },
    hasIcon() {
      if (this.leftClickCount > 0) {
        document.getElementById('scrollArea').style.left = '0px'
        this.leftClickCount = 0
        this.rightClickCount = 0
      }
      const baseWidth = this.list.length * (this.itemWidth + this.itemGap)
      if (window.innerWidth >= baseWidth) {
        this.iconShow = false
      } else {
        this.iconShow = true
      }
      if (window.innerWidth < baseWidth - 240) {
        this.dynamicNum = this.list.length - 5
      }
      if (window.innerWidth <= baseWidth - 447) {
        this.dynamicNum = this.list.length - 4
      }
      if (window.innerWidth <= baseWidth - 447 - (this.itemWidth + this.itemGap)) {
        this.dynamicNum = this.list.length - 3
      }
      if (
        window.innerWidth <=
        baseWidth - 447 - (this.itemWidth + this.itemGap) - (this.itemWidth + this.itemGap)
      ) {
        this.dynamicNum = this.list.length - 2
      }
    }
  }
}
</script>

<style lang='scss' scope>
#listArea {
  overflow: hidden;
  position: relative;
  transition: 0.7s;
}
.swiper {
  &-list {
    height: inherit;
    padding: 5px 0;
    position: absolute;
    transition: 0.7s;
    left: 0;
    display: flex;
  }
  &-item {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(231, 234, 241, 1);
    flex-shrink: 0;
    transition: 0.5s;
    &:hover {
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      transform: translate(1px, -1px);
    }
  }
  &-icon {
    background: #ccc;
    text-align: center;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    cursor: pointer;
    border-radius: 50%;
    color: #fff;
    &.large {
      width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 16px;
    }
    &.normal {
      width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
    &.small {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }
  }
}
</style>
