import { defineStore } from "pinia";

export const useClienteStore = defineStore("clienteStore", {
  state: () => ({
    cliente: [],
  }),
  actions: {
    setClientes(cliente: []) {
      this.cliente = cliente;
    },
  },
});
