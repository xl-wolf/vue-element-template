<template>
  <el-container class="h100p">
    <el-aside class="h100p" :width="menuStatus?'auto':'200px'">
      <sidebar class="h100p" />
    </el-aside>
    <el-container>
      <el-header>
        <headerNav />
      </el-header>
      <el-main>
        <appMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidebar from './components/sidebar'
import headerNav from './components/headerNav'
import appMain from './components/appMain'
import { mapGetters } from 'vuex'
export default {
  components: { sidebar, headerNav, appMain },
  computed: { ...mapGetters(['menuStatus']) }
}
</script>

<style lang="scss">
.el-header {
  background: #545c64;
}
</style>