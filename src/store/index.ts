import {createStore, MutationTree} from 'vuex'
import VuexPersistence from 'vuex-persist'
import {
  Filter,
  User,
  State,
  MutationTypes
} from "@/types/types";

const vuexLocalStoragePlugin = new VuexPersistence({
  storage: localStorage // use sessionStorage for store persistence
}).plugin

const state : State = {
  users: [],
  filterOptions: <Filter>{},
  selectedUser: <User>{},
}

// Mutation enums
export enum MutationEnum  {
  SAVE_USERS = 'SAVE_USERS',
  SAVE_SELECTED_USER = 'SAVE_SELECTED_USER',
  SAVE_FILTER_OPTIONS = 'SAVE_FILTER_OPTIONS',
}

// declare mutations
const mutations: MutationTree<State> & MutationTypes = {
  [MutationEnum.SAVE_USERS](
      state: State,
      payload: Array<User>
  ) {
    state.users = payload
  },

  [MutationEnum.SAVE_SELECTED_USER](
      state: State,
      payload: User
  ) {
    state.selectedUser = payload
  },

  [MutationEnum.SAVE_FILTER_OPTIONS](
      state: State,
      payload: Filter
  ) {
    state.filterOptions = payload
  }
}

export default createStore({
  state,
  mutations,
  plugins: [vuexLocalStoragePlugin]
})
