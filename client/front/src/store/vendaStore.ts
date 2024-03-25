import { defineStore } from "pinia";

export const useVendaStore = defineStore("vendaStore", {
  state: () => ({
    venda: [],
  }),
  actions: {
    setVenda(venda: []) {
      this.venda = venda;
    },
  },
});
