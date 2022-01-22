<template>
  <div class="d-block text-center">
    <span class="spinner-border-md text-primary spinner-border"></span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'InlineLoader'
})
export default class InlineLoader extends Vue {}
</script>

<style lang="scss" scoped>
  .spinner-border-xs {
    width: 1rem;
    height: 1rem;
    border-width: .15rem;
  }
</style>
