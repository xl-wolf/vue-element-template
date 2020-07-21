<template>
  <div class="app-main-container">
    <el-card shadow="hover">
      <vue-typing :text="typingText" :cursorOptions="myCursor" :framerate="4" />
    </el-card>
    <div @click="handleClick" v-if="0">{{testText}}</div>
  </div>
</template>

<script>
import VueTyping from '@/components/xl-vue-typing'
export default {
  name: 'home',
  components: { VueTyping },
  data() {
    return {
      testText: 111,
      test: 111,//此时test还未被作为依赖收集   依赖收集时有区分是否render函数中的数据，如果是的话就会在初次渲染时进行依赖收集，否则暂时不进行依赖收集。如果在data中声明的变量未在render函数中有被使用而在后期的某个地方被访问了，只要有访问时就会触发该变量的getter钩子从而会执行源码中的pushTarget(this)，把自身赋值给Dep.target进行依赖收集后再把Dep.target清空未null
      typingText: null,
      myCursor: { blinking: true, cursor: '|', color: 'black', framerate: 24 }
    }
  },

  mounted() {
    this.startType()
  },
  watch: {
    test: {//此时vue内部执行了new Watcher操作，故而触发了test的getter钩子引发了依赖收集
      // deep: true,
      // immediate: true,
      handler: function(val, oldVal) {
        this.testText++
      }
    }
  },

  methods: {
    handleClick(){
      this.test++
    },
    startType() {
      this.typingText = `I'm home page,you can now begin your development in this frame,enjoy yourself a good journey!`
    }
  }
}
</script>

<style>
</style>