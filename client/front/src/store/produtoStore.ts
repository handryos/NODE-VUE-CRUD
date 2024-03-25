import { defineStore } from "pinia";

export const useProdutoStore = defineStore("produtoStore", {
  state: () => ({
    produto: [],
  }),
  actions: {
    setProduto(produto: []) {
      this.produto = produto;
    },
  },
});
