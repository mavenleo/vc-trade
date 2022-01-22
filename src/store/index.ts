import {createStore, MutationTree} from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocalStoragePlugin = new VuexPersistence({
  storage: localStorage // use local storage for store persistence
}).plugin

export type State = {
  users: string[],
  filterOptions: Record<string, string>,
  selectedUser: Record<string, string>,
}

const state : State = {
  users: [],
  filterOptions: {},
  selectedUser: {},
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
      payload: string[]
  ):void;

  [MutationEnum.SAVE_SELECTED_USER](
      state: S,
      payload: Record<string, string>
  ):void;

  [MutationEnum.SAVE_FILTER_OPTIONS](
      state: S,
      payload: Record<string, string>
  ):void;
}

// declare mutations
const mutations: MutationTree<State> & MutationTypes = {
  [MutationEnum.SAVE_USERS](
      state: State,
      payload: string[]
  ) {
    state.users = payload
  },

  [MutationEnum.SAVE_SELECTED_USER](
      state: State,
      payload: Record<string, string>
  ) {
    state.selectedUser = payload
  },

  [MutationEnum.SAVE_FILTER_OPTIONS](
      state: State,
      payload: Record<string, string>
  ) {
    state.filterOptions = payload
  }
}

export default createStore({
  state,
  mutations,
  plugins: [vuexLocalStoragePlugin]
})
