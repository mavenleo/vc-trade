<template>
  <section>
    <div class="rounded user-card-bg p-3">
      <div class="d-md-flex d-sm-block align-items-md-center mb-4 pb-4">
        <UserImageComponent :src="getObjProperty(user, 'picture.large')" text="TL" size="200"/>
        <div class="ml-3">
          <div class="user-name text-left">
            {{ `${getObjProperty(user, 'name.first')} ${getObjProperty(user, 'name.last')}` }}
          </div>
          <div class="mt-2 text-muted text-left">
            {{
              `${getObjProperty(user, 'id.name')} ${getObjProperty(user, 'id.value')}`
            }}
          </div>
        </div>
      </div>
      <div class="contact-info text-left">
        <h4 class="mb-2 border-bottom text-left">User information</h4>
        <table class="user-info-table">
          <tr>
            <td>Gender </td>
            <td>{{ user.gender }}</td>
          </tr>
          <tr>
            <td>Email </td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td>Phone number </td>
            <td>{{ user.phone }}</td>
          </tr>
          <tr>
            <td>Nationality </td>
            <td>{{ getObjProperty(user, 'location.country') }}</td>
          </tr>
          <tr>
            <td>State </td>
            <td>{{ getObjProperty(user, 'location.state') }}</td>
          </tr>
          <tr>
            <td>Postcode </td>
            <td>{{ getObjProperty(user, 'location.postcode') }}</td>
          </tr>
          <tr>
            <td>Street </td>
            <td>{{ `${getObjProperty(user, 'location.street.number')}, ${getObjProperty(user, 'location.street.name')}` }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserImageComponent from "./UserImageComponent.vue";
import _ from 'lodash'
import {User} from "@/interfaces/Interfaces"


@Options({
  name: 'DetailedUserInfo',
  components: { UserImageComponent },
  props: {
    user: {
      type: Object as User,
      default: () => ({}),
      required: true,
    }
  },
  methods: {
    getObjProperty(obj: User, path: string): string {
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
  }
  &-name{
    font-weight: bold;
    font-size: 2.5rem;
  }
}
.user-info-table{
  width: 100%;
  tr {
    &:nth-of-type(odd){
      background: #fcfcfc;
    }
    & td{
      padding: 10px;
      &:first-of-type{
        text-align: right;
        font-weight: bold;
        padding-right: 10px;
      }
      &:last-of-type{
        text-align: left;
      }

    }
  }
}
</style>
