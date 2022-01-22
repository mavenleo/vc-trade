<template>
  <section class="p-5">
    <span>Loading...</span>
  </section>
</template>



<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import InlineLoader from './InlineLoader.vue'

@Options({
  name: 'InfiniteScrolling',
  components: {
    InlineLoader
  },
  props: {
    counter: Number
  },
  data(){
    return {
      observer: null
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(([el]) => {
      if (el && el.isIntersecting){
        this.$emit('load-more', true)
      }
    })

    this.observer.observe(this.$el)
  },
})
export default class InfiniteScrolling extends Vue {}
</script>
