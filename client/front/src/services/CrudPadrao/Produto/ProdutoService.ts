import { useToast } from "vue-toast-notification";
import AppAxios from "../axios/AppAxios";
import type { Router } from "vue-router";

export interface Produto {
  nome: number;
  quantidade: number;
  preco: number;
}

export default {
  getAllProdutos() {
    return AppAxios().get("/produto/filtradoAll");
  },
  getDataProdutoById(id: number) {
    return AppAxios().get(`produto/filtrado/${id}`);
  },
  async save(produto: Produto, router: Router) {
    return AppAxios()
      .post("/produto/novo", produto)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Produto salvo com sucesso");
          setTimeout(() => {
            router.push("/produto");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar o produto." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
  async update(produto: Produto, id: number, router: Router) {
    return AppAxios()
      .put(`/produto/editar/${id}`, produto)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Produto salvo com sucesso");
          setTimeout(() => {
            router.push("/produto");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar o produto." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
  async delete(id: number) {
    return AppAxios()
      .delete(`/produto/delete/${id}`)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Produto deletado com sucesso");
        }
      });
  },
};
