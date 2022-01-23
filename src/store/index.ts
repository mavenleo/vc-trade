import {createStore, MutationTree} from 'vuex'
import VuexPersistence from 'vuex-persist'
import {User} from '@/interfaces/Interfaces'

const vuexLocalStoragePlugin = new VuexPersistence({
  storage: localStorage // use local storage for store persistence
}).plugin

interface Filter{
  name: string,
  gender: string
}

export type State = {
  users: Array<User>,
  filterOptions: Filter,
  selectedUser: User,
}

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

// Mutation types
export type MutationTypes <S = State> = {
  [MutationEnum.SAVE_USERS](
      state: S,
      payload: Array<User>
  ):void;

  [MutationEnum.SAVE_SELECTED_USER](
      state: S,
      payload: User
  ):void;

  [MutationEnum.SAVE_FILTER_OPTIONS](
      state: S,
      payload: Filter
  ):void;
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
