<template>
  <div style="overflow-y: auto; height: 90vh; overflow-x: hidden">
    <table>
      <thead class="fixed-header">
        <tr class="fixed-header">
          <th colspan="5">
            <h1 style="margin-bottom: 20px">Clientes</h1>
          </th>
        </tr>
        <tr style="width: 100%">
          <td style="background-color: #98d672; justify-content: flex-start">
            <button @click="createCliente">
              <span style="color: #006b18" class="material-icons">
                add_box
              </span>
            </button>
          </td>
          <td
            colspan="5"
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
        <tr v-if="state.clientes && state.clientes.length === 0">
          <td colspan="6">
            <h1 style="margin-top: 30px">
              Nenhum cliente foi cadastrado até o momento.
            </h1>
          </td>
        </tr>
        <tr v-for="item in state.clientes" :key="item.id">
          <td class="action">
            <button class="edit-button" @click="editCliente(item.id)">
              <span class="material-icons"> edit </span>
            </button>
            <button class="delete-button" @click="deleteCliente(item.id)">
              <span class="material-icons"> delete </span>
            </button>
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.cpf }}</td>
          <td>{{ item.cidade }}</td>
          <td>{{ item.estado }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import ClienteService from "@/services/CrudPadrao/Cliente/ClienteService";
import { reactive, onMounted } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { useClienteStore } from "../../../store/clienteStore";

export default {
  name: "ClienteGrid",
  setup() {
    let state = reactive({
      clientes: [],
      store: storeToRefs(useClienteStore()),
    });
    const router = useRouter();

    onMounted(async () => {
      await getClientes();
    });
    const { setClientes } = mapActions(useClienteStore, ["setClientes"]);

    async function getClientes() {
      try {
        let clientes = await ClienteService.getAllClientes();
        state.clientes = clientes.data.data.map((clientes) => ({
          id: clientes.id,
          nome: clientes.nome,
          cpf: clientes.cpf,
          cidade: clientes.endereco.cidade,
          estado: clientes.endereco.estado,
          createdAt: clientes.createdAt,
          updatedAt: clientes.updatedAt,
        }));

        console.log(clientes);
      } catch (error) {
        console.log(error);
      }
    }

    return { state, router, getClientes, setClientes };
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
    createCliente() {
      this.router.push("/cliente/novo");
    },
    deleteCliente(id) {
      ClienteService.delete(id).then(() => {
        this.getClientes();
      });
    },
    editCliente(id) {
      ClienteService.getClientesById(id).then((response) => {
        const cliente = response.data;
        this.setClientes(cliente);
        this.router.push(`/cliente/editar/${id}`);
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
