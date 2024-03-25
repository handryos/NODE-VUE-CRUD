<template>
  <div style="overflow-y: auto; height: 90vh; overflow-x: hidden">
    <table>
      <thead class="fixed-header">
        <tr class="fixed-header">
          <th colspan="3">
            <h1 style="margin-bottom: 20px">Formas de Pagamento</h1>
          </th>
        </tr>
        <tr style="width: 100%">
          <td style="background-color: #98d672; justify-content: flex-start">
            <button @click="createFormaPagamento">
              <span style="color: #006b18" class="material-icons">
                add_box
              </span>
            </button>
          </td>
          <td
            colspan="9"
            style="background-color: #98d672; justify-content: flex-start"
          >
            <span class="material-icons"> </span>
          </td>
        </tr>
        <tr class="fixed-header">
          <th
            v-for="(column, index) in columns"
            :key="index"
            :style="{ padding: '10px ' + hrWidth }"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="state.formasDePagamento && state.formasDePagamento.length === 0"
        >
          <td colspan="6">
            <h1 style="margin-top: 30px">
              Nenhuma forma de pagamento foi cadastrada até o momento.
            </h1>
          </td>
        </tr>
        <tr v-for="item in state.formasDePagamento" :key="item.id">
          <td class="action">
            <button class="edit-button" @click="editFormaPagamento(item.id)">
              <span class="material-icons"> edit </span>
            </button>
            <button
              class="delete-button"
              @click="deleteFormaPagamento(item.id)"
            >
              <span class="material-icons"> delete </span>
            </button>
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.parcelas }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import FormaPagamentoService from "../../../services/CrudPadrao/FormaPagamento/FormaPagamentoService";
import { reactive, onMounted } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { useFormaPagamentoStore } from "../../../store/formaPagamentoStore";

export default {
  name: "FormaPagamentoGrid",
  setup() {
    let state = reactive({
      formasDePagamento: [],
      store: storeToRefs(useFormaPagamentoStore()),
    });
    const router = useRouter();

    onMounted(async () => {
      await getFormasDePagamento();
    });
    const { setForma } = mapActions(useFormaPagamentoStore, ["setForma"]);

    async function getFormasDePagamento() {
      try {
        let formas = await FormaPagamentoService.getAllFormas();
        state.formasDePagamento = formas.data.data.map((formas) => ({
          id: formas.id,
          nome: formas.nome,
          parcelas: formas.parcelas,
        }));

        console.log(formas);
      } catch (error) {
        console.log(error);
      }
    }

    return { state, router, getFormasDePagamento, setForma };
  },
  props: {
    hrWidth: {
      type: String,
      required: true,
    },

    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    createFormaPagamento() {
      this.router.push("/formaPagamento/novo");
    },
    deleteFormaPagamento(id) {
      FormaPagamentoService.delete(id).then(() => {
        this.getFormasDePagamento();
      });
    },
    editFormaPagamento(id) {
      FormaPagamentoService.getFormaById(id).then((response) => {
        const forma = response.data;
        this.setForma(forma);
        this.router.push(`/formaPagamento/editar/${id}`);
      });
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  border: none;
  width: 100%;
  overflow: hidden;
}

th {
  border-bottom: none;
  font-weight: bold;
}

td {
  padding: 14px;
  border-bottom: 0.1px solid #d6d6d6;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

button {
  padding: 5px 10px;
  margin-right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

button.edit-button {
  color: green;
}

button.delete-button {
  color: red;
}

button:hover {
  transform: translateY(2px);
}
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 0;
  background-color: #f5f5f5;
}
</style>
