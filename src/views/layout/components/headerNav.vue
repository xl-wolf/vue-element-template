<template>
  <div id="headerNav">
    <div class="collapse-ctrl">
      <i :class="!menuStatus?'el-icon-s-fold':'el-icon-s-unfold'" @click="toggleMenuCollapse"></i>
    </div>
    <div>
      <img class="img" :src="avatar" />
      <el-dropdown trigger="hover">
        <i style="color:#fff;position: relative;top: 16px;cursor:pointer" class="el-icon-caret-bottom"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a target="_blank" href="https://github.com/xl-wolf/vue-element-template">项目地址</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAvatarSession } from '@/utils/index'
export default {
  name: 'headerNav',
  computed: {
    ...mapGetters(['menuStatus']),
    avatar() {
      return getAvatarSession()
    }
  },
  methods: {
    toggleMenuCollapse() {
      this.$store.dispatch('app/toggleMenu', !this.menuStatus)
    },
    logout() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.replace({ name: 'login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
#headerNav {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .collapse-ctrl {
    width: 24px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.7s;
    color: #fff;
    &:hover {
      color: $primary-color;
    }
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    vertical-align: middle;
    margin-right: 12px;
  }
}
</style>
