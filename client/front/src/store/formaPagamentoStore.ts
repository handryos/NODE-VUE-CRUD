import { defineStore } from "pinia";

export const useFormaPagamentoStore = defineStore("formaPagamentoStore", {
  state: () => ({
    formaPagamento: [],
  }),
  actions: {
    setForma(formaPagamento: []) {
      this.formaPagamento = formaPagamento;
    },
  },
});
