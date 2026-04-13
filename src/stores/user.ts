import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: 'Jacky li',
    avatar: 'https://avatars.githubusercontent.com/u/34930213?v=4&size=64',
  }),
})
