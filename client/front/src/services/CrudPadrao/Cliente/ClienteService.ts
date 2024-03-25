import { useToast } from "vue-toast-notification";
import AppAxios from "../axios/AppAxios";
import type { Router } from "vue-router";

export interface Cliente {
  nome: number;
  cpf: number;
  telefone: number;
  endereco: number;
  email: number;
  cep: number;
}

export default {
  getAllClientes() {
    return AppAxios().get("/cliente/filtradoAll");
  },
  getClientesById(id: number) {
    return AppAxios().get(`cliente/filtrado/${id}`);
  },
  async save(cliente: Cliente, router: Router) {
    return AppAxios()
      .post("/cliente/novo", cliente)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Cliente salvo com sucesso");
          setTimeout(() => {
            router.push("/cliente");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar o cliente." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
  async update(cliente: Cliente, id: number, router: Router) {
    return AppAxios()
      .put(`/cliente/editar/${id}`, cliente)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Cliente salvo com sucesso");
          setTimeout(() => {
            router.push("/cliente");
          }, 10);
        }
      })
      .catch((error) => {
        useToast().error(
          "Falha ao salvar o cliente." + " " + error.response.data.message
        );
        console.error(error);
      });
  },
  async delete(id: number) {
    return AppAxios()
      .delete(`/cliente/delete/${id}`)
      .then((Response) => {
        if (Response.status === 200) {
          useToast().success("Cliente deletado com sucesso");
        }
      });
  },
};
