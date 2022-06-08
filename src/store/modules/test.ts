import { Module } from 'vuex';
import RootStateTypes from '@/store/interface';
import TestModuleTypes from '@/store/modules/testInterface';

const testModule: Module<TestModuleTypes,RootStateTypes> = {
  state: {
    name: 'testmodule',
    count: 0
  },
  mutations: {
    ADD_COUNT(state){
      state.count += 1;
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{

  }
}
export default testModule;
