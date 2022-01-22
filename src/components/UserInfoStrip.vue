<template>
  <div class="user-strip d-flex align-items-center">

    <UserImageComponent
        :text="createInitials(user.first, user.last)"
        :src="user.picture"
        :size="avatarSize"
    />

    <section class="info">
      <div class="name text-left">
        {{ user.name }}
      </div>

      <div class="user-phone text-left">
        {{ user.info }}
      </div>
    </section>

    <slot></slot>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserImageComponent from "./UserImageComponent.vue";

@Options({
  name: 'UserInfoStrip',
  components: { UserImageComponent },
  props: {
    user: {
      type: Object,
      required: true,
    },
    avatarSize: {
      default: '30px'
    },
  },
  methods: {
    createInitials: (...args : string[]): string => {
      return args.map(v => (v && v.length ? v[0] : "")).join("");
    },
  }
})
export default class UserInfoStrip extends Vue {}
</script>


<style lang="scss" scoped>
  .user-strip {
    .name {
      color: #124B6B;
      font-weight: 700;
      text-transform: capitalize;
    }

    .info {
      margin-left: 10px;
    }
  }

  .user-phone {
    font-size: 13px;
    color: #777777;
    margin-top: 10px;
    text-align: left;
  }
</style>
