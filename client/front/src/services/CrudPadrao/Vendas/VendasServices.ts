import type { Router } from "vue-router";
import AppAxios from "../axios/AppAxios";
import { useToast } from "vue-toast-notification";

export interface Venda {
  clienteId: number;
  produtos: [];
  formaPagamentoId: number;
  parcelas: number;
  total: number;
}

export default {
  getAllVendas() {
    return AppAxios().get("/venda/filtradoAll");
  },
  getVendaById(id: number) {
    return AppAxios().get(`/venda/filtrado/${id}`);
  },

  async delete(id: number) {
    return AppAxios()
      .delete(`/venda/delete/${id}`)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Venda deletada com sucesso");
        }
      });
  },
  async save(venda: Venda, router: Router) {
    return AppAxios()
      .post("/venda/novo", venda)
      .then((Reponse) => {
        if (Reponse.status === 200) {
          useToast().success("Venda salva com sucesso");
          setTimeout(() => {
            router.push("/venda");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar a venda." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
  async update(venda: Venda, id: number, router: Router) {
    return AppAxios()
      .post(`/venda/editar/${id}`, venda)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Venda salva com sucesso");
          setTimeout(() => {
            router.push("/venda");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar a venda." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
};
