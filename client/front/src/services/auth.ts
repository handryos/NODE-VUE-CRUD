import Api from "./Api";

export interface AuthCredentials {
    name: string;
    password: string;

};

export default {
    register (credentials: AuthCredentials) {
        return Api().post("/register", credentials)
    },
    login (credentials: AuthCredentials) {
        return Api().post("/login", credentials)
    }
}