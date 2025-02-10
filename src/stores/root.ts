import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useRootStore = defineStore('rootStore', {
  state: () => ({
    version: '0.0.1',
    updateInProgress: false,
  })
})

