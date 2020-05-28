<template>
  <div class="p20" id="swiper-demo">
    <swiper
      :list="list"
      :item-width="itemWidth"
      :item-height="itemHeight"
      :item-gap="itemGap"
      icon-scale="normal"
    >
      <template slot-scope="{item}">
        <span>{{ item.title }}</span>
      </template>
    </swiper>
  </div>
</template>

<script>
import swiper from '@/components/swiper'
export default {
  name: 'SwiperDemo',
  components: { swiper },
  data() {
    return {
      list: [
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' },
        { title: '6' },
        { title: '7' },
        { title: '8' },
        { title: '9' },
        { title: '10' },
        { title: '11' },
        { title: '12' },
        { title: '13' }
      ],
      itemWidth: 320,
      itemHeight: 200,
      itemGap: 15
    }
  }
}
</script>

<style>
#swiper-demo.p20 {
  padding: 20px;
}
</style>
