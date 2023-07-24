import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {

  // valores del objeto
  state: () => ({ count: 0 }),
  
  // metodos de computed 
  getters: {
    double: state => state.count * 2,
  },
  // metodos de acciones que cambian el objeto
  actions: {
    increment() {
      this.count++
    },
  },
})

/*
  import {useCounterStore} from './index.js'
  const store = useCounterStore()
  store.increment()

*/