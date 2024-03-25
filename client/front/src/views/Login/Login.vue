<template>
  <div class="login-container">
    <h1>Log-in</h1>
    <form @submit.prevent="login">
      <input
        type="text"
        v-model.trim="state.name"
        @input="clearError('name')"
        :class="{ 'error-input': state.nameError }"
        placeholder="Nome do usuário"
      />
      <p v-if="state.nameError" class="error">{{ state.nameError }}</p>
      <input
        type="password"
        v-model.trim="state.password"
        @input="clearError('password')"
        :class="{ 'error-input': state.passwordError }"
        placeholder="Senha"
      />
      <p v-if="state.passwordError" class="error">{{ state.passwordError }}</p>
      <p v-if="state.invalidUserErro" class="error">
        {{ state.invalidUserErro }}
      </p>
      <button type="submit">Log-in</button>
    </form>
    <p class="message">
      Não é cadastrado?
      <router-link to="/register">Cadastre-se aqui.</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/services/auth";
import { mapActions, storeToRefs } from "pinia";
import { useAuthenticationStore } from "@/store/authStore";
import { reactive } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const state = reactive({
      store: storeToRefs(useAuthenticationStore()),
      name: "",
      password: "",
      nameError: "",
      passwordError: "",
      invalidUserErro: "",
    });
    const { setToken } = mapActions(useAuthenticationStore, ["setToken"]);
    const router = useRouter();

    const schema = yup.object().shape({
      name: yup.string().required("Nome do usuário é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
    });

    const login = async () => {
      try {
        await schema.validate(
          {
            name: state.name,
            password: state.password,
          },
          { abortEarly: false }
        );
        let response = await auth.login({
          name: state.name,
          password: state.password,
        });
        localStorage.setItem("token", response.data.token);

        router.push("/home");
      } catch (error) {
        state.invalidUserErro = error.response && error.response.data.message;
        error.inner &&
          error.inner.forEach((error) => {
            if (error.path === "name") state.nameError = error.message;
            if (error.path === "password") state.passwordError = error.message;
          });
      }
    };

    const clearError = (field) => {
      state[`${field}Error`] = "";
    };

    return {
      state,
      login,
      clearError,
    };
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  width: 100vw;
}

.login-container h1 {
  margin-bottom: 20px;
}

form {
  width: 100%;
  max-width: 400px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-input {
  border-color: #c01818;
}

.error {
  color: #c01818;
  margin-bottom: 10px;
  font-size: small;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
}

.message a {
  color: #3792cb;
  text-decoration: none;
}
</style>
