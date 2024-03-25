import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore("authStore", {
  state: () => ({
    token: "",
    user: "",
    isUserLoggedIn: false,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: string) {
      this.user = user;
    },
    logOut() {
      this.token = "";
      this.user = "";
      this.isUserLoggedIn = false;
    },
  },
});
