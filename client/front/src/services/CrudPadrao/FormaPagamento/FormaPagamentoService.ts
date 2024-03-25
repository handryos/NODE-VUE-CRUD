import { useToast } from "vue-toast-notification";
import AppAxios from "../axios/AppAxios";
import type { Router } from "vue-router";

export interface FormaPagamento {
  nome: number;
  parcelas: number;
}

export default {
  getAllFormas() {
    return AppAxios().get("/formaPagamento/filtradoAll");
  },
  getFormaById(id: number, model: string) {
    return AppAxios().get(`/formaPagamento/filtrado/${id}`);
  },
  async save(formaPagamento: FormaPagamento, router: Router) {
    return AppAxios()
      .post("/formaPagamento/novo", formaPagamento)
      .then((Response) => {
        if (Response.status === 200) {
          router.push("/formaPagamento");
          useToast().success("Forma de pagamento salva com sucesso");
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar a forma de pagamento." +
            " " +
            error.response.data.message
        );
        console.error(error);
      });
  },
  async update(formaPagamento: FormaPagamento, id: number, router: Router) {
    return AppAxios()
      .put(`/formaPagamento/editar/${id}`, formaPagamento)
      .then((Response) => {
        if (Response.status === 200) {
          router.push("/formaPagamento");
          useToast().success("Forma de pagamento atualizada com sucesso");
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar a forma de pagamento." +
            " " +
            error.response.data.message
        );
        console.error(error);
      });
  },
  async delete(id: number) {
    return AppAxios()
      .delete(`/formaPagamento/delete/${id}`)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Forma de pagamento deletada com sucesso");
        }
      });
  },
};
