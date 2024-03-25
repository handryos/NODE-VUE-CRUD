import Api from "@/services/Api";

export interface User {
  email: string;
  password: string;
}

export default {
  register(credentials: User) {
    return Api().post("/register", credentials);
  },
  login(credentials: User) {
    return Api().post("/login", credentials);
  },
};
