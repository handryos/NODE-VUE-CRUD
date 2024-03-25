<script>
import { defineComponent, reactive, onMounted } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import ClienteService from "@/services/CrudPadrao/Cliente/ClienteService";
import { useClienteStore } from "@/store/clienteStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      nome: "",
      cpf: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      store: storeToRefs(useClienteStore()),
      enderecoRuaError: "",
      enderecoNumeroError: "",
      enderecoBairroError: "",
      enderecoCidadeError: "",
      enderecoEstadoError: "",
      enderecoCepError: "",
      email: "",
      nomeError: "",
      cpfError: "",
      enderecoError: "",
      emailError: "",
    });

    const schema = yup.object().shape({
      nome: yup.string().required("Nome do cliente é obrigatório"),
      cpf: yup.number().required("CPF é obrigatório"),
      email: yup
        .string()
        .required("Email é obrigatório")
        .email("Email inválido"),
      endereco: yup.object().shape({
        rua: yup.string().required("A rua é obrigatória"),
        numero: yup.number().required("O número é obrigatório"),
        bairro: yup.string().required("O bairro é obrigatório"),
        cidade: yup.string().required("A cidade é obrigatória"),
        estado: yup.string().required("O estado é obrigatório"),
        cep: yup.number().required("O CEP é obrigatório"),
      }),
    });

    onMounted(() => {
      if (state.store && state.store.cliente) {
        state.nome = state.store.cliente.data.nome;
        state.cpf = state.store.cliente.data.cpf;
        state.endereco.rua = state.store.cliente.data.endereco.rua;
        state.endereco.numero = state.store.cliente.data.endereco.numero;
        state.endereco.bairro = state.store.cliente.data.endereco.bairro;
        state.endereco.cidade = state.store.cliente.data.endereco.cidade;
        state.endereco.estado = state.store.cliente.data.endereco.estado;
        state.endereco.cep = state.store.cliente.data.endereco.cep;
        state.email = state.store.cliente.data.email;
      }
    });

    const save = async () => {
      try {
        await schema.validate(
          {
            nome: state.nome,
            cpf: state.cpf,
            endereco: {
              rua: state.endereco.rua,
              numero: state.endereco.numero,
              bairro: state.endereco.bairro,
              cidade: state.endereco.cidade,
              estado: state.endereco.estado,
              cep: state.endereco.cep,
            },
            email: state.email,
          },
          { abortEarly: false }
        );
        let response = await ClienteService.update(
          {
            nome: state.nome,
            cpf: state.cpf,
            endereco: {
              rua: state.endereco.rua,
              numero: state.endereco.numero,
              bairro: state.endereco.bairro,
              cidade: state.endereco.cidade,
              estado: state.endereco.estado,
              cep: state.endereco.cep,
            },
            email: state.email,
          },
          state.store.cliente.data.id,
          router
        );
        state.nameError = "";
        state.passwordError = "";
        state.confirmPasswordError = "";
      } catch (error) {
        console.log(error);
        error &&
          error.inner &&
          error.inner.forEach((error) => {
            if (error.path === "nome") state.nomeError = error.message;
            if (error.path === "cpf") state.cpfError = error.message;
            if (error.path === "email") state.emailError = error.message;
            const enderecoRegex = /^endereco\.(\w+)/;
            const match = error.path.match(enderecoRegex);
            if (match) {
              const field = match[1];
              state[
                `endereco${field.charAt(0).toUpperCase() + field.slice(1)}Error`
              ] = error.message;
            }
          });
      }
    };

    return {
      state,
      save,
    };
  },
});
</script>

<template>
  <div class="login-container">
    <h1 style="margin-bottom: 20px">Cadastro de Clientes</h1>
    <form style="width: 100%" @submit.prevent="save">
      <h3 style="margin-bottom: 20px">Dados pessoais</h3>
      <input
        type="text"
        @input="state.nomeError = undefined"
        v-model="state.nome"
        :style="{
          'box-shadow': state.nomeError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="nome"
        placeholder="Nome do cliente"
      />
      <p v-if="state.nomeError" class="error">{{ state.nomeError }}</p>

      <input
        type="number"
        @input="state.cpfError = undefined"
        v-model="state.cpf"
        :style="{
          'box-shadow': state.cpfError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="cpf"
        placeholder="CPF"
      />
      <p v-if="state.cpfError" class="error">{{ state.cpfError }}</p>
      <h3 style="margin-bottom: 20px">Endereço</h3>
      <input
        type="email"
        @input="state.emailError = undefined"
        v-model="state.email"
        :style="{
          'box-shadow': state.emailError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="email"
        placeholder="Email"
      />
      <p v-if="state.emailError" class="error">{{ state.emailError }}</p>
      <input
        type="text"
        @input="state.enderecoRuaError = undefined"
        v-model="state.endereco.rua"
        :style="{
          'box-shadow': state.enderecoRuaError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="rua"
        placeholder="Rua"
      />
      <p v-if="state.enderecoRuaError" class="error">
        {{ state.enderecoRuaError }}
      </p>

      <input
        type="number"
        @input="state.enderecoNumeroError = undefined"
        v-model="state.endereco.numero"
        :style="{
          'box-shadow': state.enderecoNumeroError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="numero"
        placeholder="Número"
      />
      <p v-if="state.enderecoNumeroError" class="error">
        {{ state.enderecoNumeroError }}
      </p>

      <input
        type="text"
        @input="state.enderecoBairroError = undefined"
        v-model="state.endereco.bairro"
        :style="{
          'box-shadow': state.enderecoBairroError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="bairro"
        placeholder="Bairro"
      />
      <p v-if="state.enderecoBairroError" class="error">
        {{ state.enderecoBairroError }}
      </p>

      <input
        type="text"
        @input="state.enderecoCidadeError = undefined"
        v-model="state.endereco.cidade"
        :style="{
          'box-shadow': state.enderecoCidadeError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="cidade"
        placeholder="Cidade"
      />
      <p v-if="state.enderecoCidadeError" class="error">
        {{ state.enderecoCidadeError }}
      </p>

      <input
        type="text"
        @input="state.enderecoEstadoError = undefined"
        v-model="state.endereco.estado"
        :style="{
          'box-shadow': state.enderecoEstadoError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="estado"
        placeholder="Estado"
      />
      <p v-if="state.enderecoEstadoError" class="error">
        {{ state.enderecoEstadoError }}
      </p>

      <input
        type="number"
        @input="state.enderecoCepError = undefined"
        v-model="state.endereco.cep"
        :style="{
          'box-shadow': state.enderecoCepError
            ? '0 0 0.1rem hwb(0 1% 11%)'
            : '',
        }"
        name="cep"
        placeholder="CEP"
      />
      <p v-if="state.enderecoCepError" class="error">
        {{ state.enderecoCepError }}
      </p>
      <button type="submit">Salvar</button>
    </form>
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
  max-width: 600px;
}

.input-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.column {
  flex: 1;
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
