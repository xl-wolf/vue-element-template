<template>
  <div id="headerNav">
    <div class="collapse-ctrl">
      <i :class="!menuStatus?'el-icon-s-fold':'el-icon-s-unfold'" @click="toggleMenuCollapse"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'headerNav',
  computed: {
    ...mapGetters(['menuStatus'])
  },
  methods: {
    toggleMenuCollapse() {
      this.$store.dispatch('app/toggleMenu', !this.menuStatus)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
#headerNav {
  line-height: 60px;
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
}
</style>
