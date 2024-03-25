<script>
import { defineComponent, reactive } from "vue";
import * as yup from "yup";
import auth from "@/services/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      passwordError: "",
      confirmPasswordError: "",
      alreadyRegistered: "",
    });

    const schema = yup.object().shape({
      name: yup.string().required("Nome do usuário é obrigatório"),
      password: yup
        .string()
        .required("Senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas não conferem"),
    });

    const register = async () => {
      try {
        await schema.validate(
          {
            name: state.name,
            password: state.password,
            confirmPassword: state.confirmPassword,
          },
          { abortEarly: false }
        );
        let response = await auth.register({
          name: state.name,
          password: state.password,
        });
        console.log(response.status == 200);
        response.status == 200 && router.push("/login");

        state.nameError = "";
        state.passwordError = "";
        state.confirmPasswordError = "";
      } catch (error) {
        console.log(error);
        state.alreadyRegistered = error.response && error.response.data.message;
        error &&
          error.inner &&
          error.inner.forEach((error) => {
            if (error.path === "name") state.nameError = error.message;
            if (error.path === "password") state.passwordError = error.message;
            if (error.path === "confirmPassword")
              state.confirmPasswordError = error.message;
          });
      }
    };

    return {
      state,
      register,
    };
  },
});
</script>

<template>
  <div class="login-container">
    <h1 style="margin-bottom: 20px">Cadastre-se</h1>
    <form style="width: 100%" @submit.prevent="register">
      <input
        type="text"
        @input="state.nameError = undefined"
        v-model="state.name"
        :style="{
          'box-shadow': state.nameError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="name"
        placeholder="Nome do usuário"
      />
      <p v-if="state.nameError" class="error">{{ state.nameError }}</p>
      <input
        type="password"
        @input="state.passwordError = undefined"
        :style="{
          'box-shadow': state.passwordError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        v-model="state.password"
        name="password"
        placeholder="Senha"
      />
      <p v-if="state.passwordError" class="error">
        {{ state.passwordError != "" ? state.passwordError : "" }}
      </p>
      <input
        type="password"
        @input="state.confirmPasswordError = undefined"
        v-model="state.confirmPassword"
        :style="{
          'box-shadow': state.confirmPasswordError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="confirmPassword"
        placeholder="Confirme sua senha"
      />
      <p v-if="state.confirmPasswordError" class="error">
        {{
          state.confirmPasswordError != ""
            ? state.confirmPasswordError + "."
            : ""
        }}
      </p>
      <h3 class="error">
        {{ state.alreadyRegistered != "" ? state.alreadyRegistered + "." : "" }}
      </h3>
      <button type="submit">Registrar-se</button>
    </form>
    <p class="message">
      <router-link to="/login">Voltar para a página de Login.</router-link>
    </p>
  </div>
</template>

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
