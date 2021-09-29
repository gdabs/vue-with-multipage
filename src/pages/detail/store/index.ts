
import { Store, createStore } from 'vuex';

export interface State { 
  serverTimeStamp: number;
}

const store: Store<State> = createStore({
  devtools: process.env.NODE_ENV === 'development' ? true : false,
  state: () => ({
    serverTimeStamp: 0
  }),
  mutations: {
    serverTimeStamp (state, value) {
      state.serverTimeStamp = value;
    },
  },
  getters: {
    serverTimeStamp (state) {
      return state.serverTimeStamp;
    },
  },
  actions: {
    pageInfo ({ commit, state }, { payload }) {
      const { serverTimeStamp } = payload;
      commit('serverTimeStamp', serverTimeStamp);
    }
  }
});

export default store;