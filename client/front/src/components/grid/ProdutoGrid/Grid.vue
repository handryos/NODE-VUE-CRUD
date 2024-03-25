<template>
  <div style="overflow-y: auto; height: 90vh; overflow-x: hidden">
    <table>
      <thead class="fixed-header">
        <tr class="fixed-header">
          <th colspan="8">
            <h1 style="margin-bottom: 20px">Produtos</h1>
          </th>
        </tr>
        <tr style="width: 100%">
          <td style="background-color: #98d672; justify-content: flex-start">
            <button @click="createProduto">
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
        <tr v-if="state.produtos && state.produtos.length === 0">
          <td colspan="6">
            <h1 style="margin-top: 30px">
              Nenhum produto foi cadastrado até o momento.
            </h1>
          </td>
        </tr>
        <tr v-for="item in state.produtos" :key="item.id">
          <td class="action">
            <button class="edit-button" @click="editProduto(item.id)">
              <span class="material-icons"> edit </span>
            </button>
            <button class="delete-button" @click="deleteProduto(item.id)">
              <span class="material-icons"> delete </span>
            </button>
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.quantidade }}</td>
          <td>{{ item.preco }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import ProdutoService from "../../../services/CrudPadrao/Produto/ProdutoService";
import { reactive, onMounted } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { useProdutoStore } from "../../../store/produtoStore";

export default {
  name: "ProdutoGrid",
  setup() {
    let state = reactive({
      produtos: [],
      store: storeToRefs(useProdutoStore()),
    });
    const router = useRouter();

    onMounted(async () => {
      await getProdutos();
    });
    const { setProduto } = mapActions(useProdutoStore, ["setProduto"]);

    async function getProdutos() {
      try {
        let produtos = await ProdutoService.getAllProdutos();
        state.produtos = produtos.data.data.map((produtos) => ({
          id: produtos.id,
          nome: produtos.nome,
          quantidade: produtos.quantidade,
          preco: produtos.preco,
        }));

        console.log(produtos);
      } catch (error) {
        console.log(error);
      }
    }

    return { state, router, getProdutos, setProduto };
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
    createProduto() {
      this.router.push("/produto/novo");
    },
    deleteProduto(id) {
      ProdutoService.delete(id).then(() => {
        this.getProdutos();
      });
    },
    editProduto(id) {
      ProdutoService.getDataProdutoById(id).then((response) => {
        const produto = response.data;
        this.setProduto(produto);
        this.router.push(`/produto/editar/${id}`);
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
