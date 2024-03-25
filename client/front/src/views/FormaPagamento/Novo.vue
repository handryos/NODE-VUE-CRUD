<script>
import { defineComponent, reactive, onMounted } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import FormaPagamentoService from "@/services/CrudPadrao/FormaPagamento/FormaPagamentoService";
import { useFormaPagamentoStore } from "@/store/formaPagamentoStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      nome: "",
      parcelas: "",
      parcelasError: "",
      nomeError: "",
      store: storeToRefs(useFormaPagamentoStore()),
    });
    const schema = yup.object().shape({
      nome: yup.string().required("Nome do cliente é obrigatório"),
      parcelas: yup
        .number()
        .required("A quantidade é obrigatória")
        .typeError("A quantidade é obrigatória"),
    });

    const save = async () => {
      try {
        await schema.validate(
          {
            nome: state.nome,
            parcelas: state.parcelas,
          },
          { abortEarly: false }
        );
        let response = await FormaPagamentoService.save(
          {
            nome: state.nome,
            parcelas: state.parcelas,
          },
          router
        );
      } catch (error) {
        console.log(error);
        error &&
          error.inner &&
          error.inner.forEach((error) => {
            if (error.path === "nome") state.nomeError = error.message;
            if (error.path === "parcelas") state.cpfError = error.message;
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
    <h1 style="margin-bottom: 20px">Cadastro das Formas de Pagamento</h1>
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
        placeholder="Nome da forma"
      />
      <p v-if="state.nomeError" class="error">{{ state.nomeError }}</p>
      <input
        type="number"
        @input="state.parcelasError = undefined"
        v-model="state.parcelas"
        :style="{
          'box-shadow': state.parcelasError ? '0 0 0.1rem hwb(0 1% 11%)' : '',
        }"
        name="parcelas"
        placeholder="Número de parcelas"
      />
      <p v-if="state.parcelasError" class="error">
        {{ state.parcelasError }}
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
