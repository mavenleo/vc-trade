<template>
  <section>
    <div class="rounded user-card-bg user-card-shadow p-3">
      <div class="d-md-flex d-sm-block align-items-md-center mb-4 pb-4">
        <UserImageComponent :src="getObjProperty(user, 'picture.large')" text="TL" size="200"/>
        <div class="ml-3">
          <div class="user-name text-left">
            {{ `${getObjProperty(user, 'name.first')} ${getObjProperty(user, 'name.last')}` }}
          </div>
          <div class="mt-3 text-muted text-left">
            <strong>ID:</strong>
            {{
              `${getObjProperty(user, 'id.name')} ${getObjProperty(user, 'id.value')}`
            }}
          </div>
        </div>
      </div>
      <div class="contact-info text-left">
        <h4 class="mb-2 border-bottom text-left">User information</h4>
        <div>
          <strong>Gender: </strong> {{ user.gender }}
        </div>
        <div>
          <strong>Email: </strong> {{ user.email }}
        </div>
        <div>
          <strong>Phone number: </strong> {{ user.phone }}
        </div>
        <div>
          <strong>Nationality: </strong> {{ getObjProperty(user, 'location.country') }}
        </div>
        <div>
          <strong>State: </strong> {{ getObjProperty(user, 'location.state') }}
        </div>
        <div>
          <strong>Postcode: </strong> {{ getObjProperty(user, 'location.postcode') }}
        </div>
        <div>
          <strong>Street: </strong>
          {{ `${getObjProperty(user, 'location.street.number')}, ${getObjProperty(user, 'location.street.name')}` }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserImageComponent from "./UserImageComponent.vue";
import _ from 'lodash'

@Options({
  name: 'DetailedUserInfo',
  components: { UserImageComponent },
  props: {
    user: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      default: () => ({}),
      required: true,
    }
  },
  methods: {
    getObjProperty(obj: Record<string, any>, path: string): string {
      return _.get(obj, path) || '--'
    }
  }
})
export default class DetailedUserInfo extends Vue {}
</script>


<style lang="scss" scoped>
.user{
  &-card{
    &-bg {
      border: 1px solid #d8e4f1;
      background: #eff9ff;
    }
    &-shadow{
      box-shadow: 0 25px 35px rgba(0, 0, 0, .08);
    }
  }
  &-name{
    font-weight: bold;
    font-size: 2.5rem;
  }
}
</style>
