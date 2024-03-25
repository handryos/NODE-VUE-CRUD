<template>
  <div style="overflow-y: auto; height: 90vh; overflow-x: hidden">
    <table>
      <thead class="fixed-header">
        <tr class="fixed-header">
          <th colspan="8">
            <h1>Vendas</h1>
          </th>
        </tr>
        <tr style="width: 100%">
          <td style="background-color: #98d672; justify-content: flex-start">
            <button @click="createVenda">
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
        <tr v-if="state.vendas.length === 0">
          <td colspan="6">
            <h1 style="margin-top: 30px">
              Nenhuma venda foi cadastrada até o momento.
            </h1>
          </td>
        </tr>
        <tr v-else v-for="item in state.vendas" :key="item.id">
          <td class="action">
            <button class="edit-button" @click="editVenda(item.id)">
              <span class="material-icons"> edit </span>
            </button>
            <button class="delete-button" @click="deleteVenda(item.id)">
              <span class="material-icons"> delete </span>
            </button>
          </td>
          <td>{{ item.cliente }}</td>
          <td>{{ item.produto }}</td>
          <td>{{ item.formaPagamento }}</td>
          <td>{{ item.parcelas }}</td>
          <td>{{ item.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import VendasServices from "@/services/CrudPadrao/Vendas/VendasServices";
import { reactive, onMounted } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { useVendaStore } from "../../store/vendaStore";

export default {
  name: "Grid",
  setup() {
    let state = reactive({
      vendas: [],
      store: storeToRefs(useVendaStore()),
    });
    const router = useRouter();

    onMounted(async () => {
      await getVendas();
    });
    const { setVenda } = mapActions(useVendaStore, ["setVenda"]);

    async function getVendas() {
      try {
        let vendas = await VendasServices.getAllVendas();
        console.log(vendas);
        state.vendas = vendas.data.data.map((venda) => ({
          id: venda.venda.id,
          cliente: venda.venda.cliente.nome,
          produto: venda.venda.produtos
            .map((produto) => produto.nome)
            .join(", "),
          formaPagamento: venda.venda.formaPagamento.nome,
          parcelas: venda.venda.formaPagamento.parcelas,
          total: venda.venda.total,
        }));

        console.log(vendas);
      } catch (error) {
        console.log(error);
      }
    }

    return { state, router, getVendas, setVenda };
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
    createVenda() {
      this.router.push("/venda/novo");
    },
    deleteVenda(id) {
      VendasServices.delete(id).then(() => {
        this.getVendas();
      });
    },
    editVenda(id) {
      VendasServices.getVendaById(id).then((response) => {
        const venda = response.data;
        this.setVenda(venda);
        this.router.push(`/venda/editar/${id}`);
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
