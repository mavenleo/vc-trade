<template>
  <div class="user-image"
       :style="userImageSizeStyle">
    <!-- Use reverse image replacement approach to solve image absence glitches :-D -->
    <img :src="src" @error="replaceImage" v-if="src" :alt="text" />

    <!------------- replacement --------->
    <div class="image-alt"
         v-else
         :style="{
          ...userImageSizeStyle,
         fontSize: '0.95em'
    }"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'UserImageComponent',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: 'Photo',
    },
    src: {
      type: [String, Boolean],
      required: true,
    },
    size: {
      type: [String, Number],
      default: '30px',
    }
  },

  computed: {
    userImageSizeStyle() : Record<string, string> {
      const size = isNaN(this.size) ? this.size : `${this.size}px`;
      return {
        width: size,
        height: size,
      };
    },
  },

  methods: {
    /**
     * Attempt to show text if no image
     */
    replaceImage() : void {
      // hide broken image
      this.showImageAlt = true;
    },
  },
})
export default class UserImageComponent extends Vue {}
</script>

<style lang="scss" scoped>
  .user-image {
    display: inline-block;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
    }

    .image-alt {
      display: flex;
      width: inherit;
      height: inherit;
      text-align: center;
      text-transform: uppercase;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }
</style>
