<template>
  <section>
      <!-------------    Before page loads      -------------->
    <div class="loading-state" v-if="isInitialLoading">
      <InlineLoader /> <!-- spinner -->
    </div>

    <!---------------    After page loads      --------------->
    <div v-else class="card wrapper border-0 rounded m-md-5 m-sm-3 p-3">
      <div class="row">
        <div class="col-md-4">
          <div>
            <div class="form-group">
              <input type="text" v-model="filterOptions.name" placeholder="search users" class="form-control">
            </div>
            <div class="form-group d-md-flex">
              <div class="d-flex">
                <div class="mr-4 d-flex align-items-center">
                  <label>Male </label>
                  <input type="radio" v-model="filterOptions.gender" value="male" class="mt-n2 ml-2 cursor-pointer">
                </div>
                <div class="d-flex align-items-center mr-3">
                  <label>Female </label>
                  <input type="radio" v-model="filterOptions.gender" value="female" class="mt-n2 ml-2 cursor-pointer">
                </div>
              </div>
              <div class="d-flex justify-content-sm-between">
                <div class="d-flex align-items-center mt-md-n2">
                  <div class="mr-2">Total users: </div>
                  <strong>{{ filteredUsers.length }} </strong>
                </div>
                <div
                    v-if="Object.keys(filterOptions).length"
                    class="text-danger cursor-pointer ml-2 mt-sm-n2 mt-md-0"
                    @click="clearFilter"
                ><strong>clear</strong>
                </div>
              </div>
            </div>

          </div>

          <!---------------         Search list   ------------------>
          <div class="position-relative" style="height: 70vh; overflow-y: visible; overflow-x: hidden">
            <div class="rounded mb-2 p-3 user-card-bg user-card-bg-hover cursor-pointer user-card-shadow"
                 @click="handleUserSelection(user)"
                 v-for="user in filteredUsers" :key="user.name">
              <UserInfoStrip avatar-size="50px" :user="{
                      name: `${user.name.first} ${user.name.last}`,
                      picture: user.picture.thumbnail,
                      info: user.email,
              }" />
            </div>
            <div class="position-relative" style="bottom: 0">

              <!---------------  For infinite scrolling ---------------->
              <InlineLoader v-if="loadingState" />
              <InfiniteScrolling v-if="showScroller" :counter="loadedCount" @load-more="handleScrollEvent"></InfiniteScrolling>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="text-center">
            <small
                class="mb-2 text-muted font-weight-lighter font-italic">
              First user is selected by default
            </small>
          </div>

            <!---------------   mount component to show selected user information   -------------->
          <DetailedUserInfo :user="selectedUser" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserModel from "@/models/UserModel";
import store, {MutationEnum} from "@/store";
import UserInfoStrip from "./components/UserInfoStrip.vue";
import DetailedUserInfo from "./components/DetailedUserInfo.vue";
import InlineLoader from "./components/InlineLoader.vue";
import UserImageComponent from "./components/UserImageComponent.vue";
import InfiniteScrolling from "./components/InfiniteLoading.vue";
import {Data} from "./interfaces/interfaces"
import {User} from "@/types/types";


@Options({
  components: {
    UserInfoStrip,
    InfiniteScrolling,
    DetailedUserInfo,
    UserImageComponent,
    InlineLoader
  },
  data() : Data {
    return {
      users: store.state.users,
      filterOptions: store.state.filterOptions,
      selectedUser: store.state.selectedUser,
      loadingState: true,
      showScroller: true,
      loadedCount: 0,
    }
  },

  mounted() {
    /* Call the endpoint when component mounts for the first time,
       Load more from scrolling after, so state remains the same even on page reload*/
    if (!this.users.length) {
      this.getUsers()
    }else {
      this.loadingState = false
    }


  },

  computed: {
    isInitialLoading(): boolean{
        return this.loadingState && !this.users.length
    },
    filteredUsers(): Array<User> {
      if (!this.filterOptions.name
          && !this.filterOptions.gender){
        return this.users
      }
      return this.handleFilterChanges()
    }
  },

  methods: {
    getUsers() : void {
      this.showScroller = false
      UserModel.getUsers({results: 25})
          .then(response => {
            this.users = [...this.users, ...response.results]
            store.commit(MutationEnum.SAVE_USERS, this.users)

            // if selectedUser doesn't exist usually when someone hits page for the first time
            if (!Object.keys(this.selectedUser).length) {
              this.selectedUser = response.results[0]
              store.commit(MutationEnum.SAVE_SELECTED_USER, this.selectedUser)
            }
            this.showScroller = true
            this.loadingState = false
          }).catch(e => {
            throw e;
      })
    },

    clearFilter() : void {
      store.commit(MutationEnum.SAVE_FILTER_OPTIONS, {})
      this.filterOptions = {}
    },

    handleScrollEvent() : void {
      this.loadedCount++ // this is just so we re-mount the infinite loading component
      this.loadingState = true
      this.getUsers()
    },

    handleUserSelection(user : User ) : void{
      this.selectedUser = user
      store.commit(MutationEnum.SAVE_SELECTED_USER, user)
    },

    handleFilterChanges() : Array<User> {
      store.commit(MutationEnum.SAVE_FILTER_OPTIONS, this.filterOptions)
      const {name, gender} = this.filterOptions

      if (gender && !name){

        return this.users.filter((v: User ) =>
            v.gender == gender)

      } else if (gender && (name && name.length)){

        return this.users.filter((v: User ) =>
            (v.name.first.toLowerCase()
                    .includes(name.toLowerCase())
                || v.name.last.toLowerCase()
                    .includes(name.toLowerCase()))
            && v.gender == this.filterOptions.gender)

      } else if (!gender && (name && name.length)){

        return this.users.filter((v: User ) =>
            (v.name.first.toLowerCase()
                    .includes(name.toLowerCase())
                || v.name.last.toLowerCase()
                    .includes(name.toLowerCase())))

      } else {
        return []
      }
    }
  }
})
export default class HelloWorld extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper{
  background: #ffffff9c;
  border: 1px solid #d8e4f1 !important;
}
.loading-state{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user{
  &-card{
    &-bg {
      background: #eff9ff;
      border: 1px solid #d8e4f1;
      &-hover:hover {
        background: #c7e5fa;
      }
    }
  }
  &-name{
    font-weight: bold;
    font-size: 2.5rem;
  }
}
.cursor-pointer{
  cursor: pointer;
}
.filter-radio{
  width: 70% !important;
}
</style>
