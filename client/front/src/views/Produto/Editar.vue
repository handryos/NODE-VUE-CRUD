<script>
import { defineComponent, reactive, onMounted } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import ProdutoService from "@/services/CrudPadrao/Produto/ProdutoService";
import { useProdutoStore } from "@/store/produtoStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      nome: "",
      quantidade: "",
      preco: "",
      precoError: "",
      quantidadeError: "",
      nomeError: "",
      store: storeToRefs(useProdutoStore()),
    });
    console.log(state.store);
    const schema = yup.object().shape({
      nome: yup.string().required("Nome do cliente é obrigatório"),
      quantidade: yup
        .number()
        .required("A quantidade é obrigatória")
        .typeError("A quantidade é obrigatória"),
      preco: yup
        .number()
        .required("Email é obrigatório")
        .min(0.01, "O preço deve ser maior que 0")
        .typeError("O preço é obrigatório"),
    });

    onMounted(() => {
      if (state.store && state.store.produto) {
        state.nome = state.store.produto.data.nome;
        state.quantidade = state.store.produto.data.quantidade;
        state.preco = state.store.produto.data.preco;
      }
    });

    const save = async () => {
      try {
        await schema.validate(
          {
            nome: state.nome,
            quantidade: state.quantidade,
            preco: state.preco,
          },
          { abortEarly: false }
        );
        let response = await ProdutoService.update(
          {
            nome: state.nome,
            quantidade: state.quantidade,
            preco: state.preco,
          },
          state.store.produto.data.id,
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
    <h1 style="margin-bottom: 20px">Cadastro de Produtos</h1>
    <form style="width: 100%" @submit.prevent="save">
      <h3 style="margin-bottom: 20px">Dados principais</h3>
      <input
        type="text"
        @input="state.nomeError = undefined"
        v-model="state.nome"
        :style="{
          'box-shadow': state.nomeError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="nome"
        placeholder="Nome do produto"
      />
      <p v-if="state.nomeError" class="error">{{ state.nomeError }}</p>
      <input
        type="number"
        @input="state.quantidadeError = undefined"
        v-model="state.quantidade"
        :style="{
          'box-shadow': state.quantidadeError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="quantidade"
        placeholder="Quantidade"
      />
      <p v-if="state.quantidadeError" class="error">
        {{ state.quantidadeError }}
      </p>
      <input
        type="number"
        @input="state.precoError = undefined"
        v-model="state.preco"
        :style="{
          'box-shadow': state.precoError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="preco"
        placeholder="Preco"
      />
      <p v-if="state.precoError" class="error">{{ state.precoError }}</p>

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
