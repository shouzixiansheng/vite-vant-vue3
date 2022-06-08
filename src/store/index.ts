import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import * as ls from '@/utils/localStorage'

import RootStateTypes, { AllStateTypes } from '@/store/interface';

// 引入子模块
import testModule from '@/store/modules/test';

export default createStore<RootStateTypes>({
  state: {
    xToken: ls.get("xToken") || '',
  },
  mutations: {
    SET_xToken(state, val) {
      state.xToken = ls.get('xToken') || '';
    },
    CLEAR_OUT(state, val) {
      state.xToken = ''
      state.address = ''
      state.connectType = 0
    }
  },
  actions: {
    async SET_xToken({ commit }, payload) {
      ls.set('xToken', payload)
      commit("SET_xToken");
    },
    async CLEAR_OUT({ commit }, payload) {
      ls.set('address', '')
      ls.set('xToken', '')
      ls.set('connectType', '')
      commit("CLEAR_OUT");
    }
  },
  getters: {
    xToken: (state) => state.xToken,
  },
  modules: {
    testModule
  }
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();
export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}
