
<template>
  <div class="recursionMenu">
    <template v-for="(menuItem) in menuTree">
      <el-submenu
        :index="menuItem.path"
        :key="menuItem.name"
        v-if="!menuItem.hidden&&menuItem.children&&menuItem.children.length"
      >
        <template slot="title">
          <i :class="'mr12 iconfont '+menuItem.meta.icon"></i>
          <!-- slot title 要加上，否则菜单收起时悬停没有tooltip出现 -->
          <span slot="title">{{menuItem.meta.title}}</span>
        </template>
        <recursionMenu :menuTree="menuItem.children" />
      </el-submenu>

      <el-menu-item
        :index="menuItem.name"
        :key="menuItem.name"
        v-else-if="!menuItem.hidden"
        @click="handleMenuItemClick(menuItem)"
      >
        <i :class="'mr12 iconfont '+menuItem.meta.icon"></i>
        <span
          slot="title"
          :class="{'hideTitle':menuStatus&&menuItem.level===1}"
        >{{menuItem.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: 'recursionMenu',
  props: {
    menuTree: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(['menuStatus'])
  },
  methods: {
    handleMenuItemClick(item) {
      const { name } = item
      const currentRouteName = this.$route.name
      if (currentRouteName !== name) {
        this.$router.push({ name })
      }
    }
  }
}
</script>

<style lang="scss">
.el-scrollbar__bar.is-horizontal {
  visibility: hidden;
}
.el-menu--collapse {
  overflow-x: hidden;
  .recursionMenu {
    .hideTitle {
      visibility: hidden;
    }
  }
}
</style>