import bcrypt from "bcrypt";
import { Cliente } from "../../models/Cliente";

interface IClienteRepo {
  save(cliente: Cliente): Promise<void>;
  update(cliente: Cliente): Promise<void>;
  delete(cliente: Cliente): Promise<void>;
  getById(cliente: Cliente): Promise<Cliente>;
  getAll(): Promise<Cliente[]>;
}

export class ClienteRepo implements IClienteRepo {
  async save(cliente: Cliente): Promise<void> {
    try {
      await Cliente.create({
        nome: cliente.nome,
        cpf: cliente.cpf,
        endereco: cliente.endereco,
        email: cliente.email,
      });
    } catch (error: any) {
      throw new Error(
        "Falha ao cadastrar o cliente!" +
          error.message.replace(
            "!duplicar valor da chave viola a restrição de unicidade cliente_nome_key102",
            "Cliente já cadastrado"
          )
      );
    }
  }

  async update(cliente: Cliente): Promise<void> {
    try {
      const updateCliente = await Cliente.findOne({
        where: {
          id: cliente.id,
        },
      });
      if (!updateCliente) {
        throw new Error("Cliente inexistente!");
      }

      if (updateCliente.nome !== cliente.nome) {
        updateCliente.nome = cliente.nome;
      }
      if (updateCliente.cpf !== cliente.cpf) {
        updateCliente.cpf = cliente.cpf;
      }

      updateCliente.endereco = cliente.endereco;
      updateCliente.email = cliente.email;

      await updateCliente.save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async delete(cliente: Cliente): Promise<void> {
    try {
      const clienteSelected = await Cliente.findOne({
        where: {
          id: cliente.id,
        },
      });
      if (!clienteSelected) {
        throw new Error("Cliente inexistente!");
      }
      await clienteSelected.destroy();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getById(cliente: Cliente): Promise<Cliente> {
    try {
      const clienteSelected = await Cliente.findOne({
        where: {
          id: cliente.id,
        },
      });
      if (!clienteSelected) {
        throw new Error("Cliente inexistente!");
      }
      return clienteSelected;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<Cliente[]> {
    try {
      let allClients = await Cliente.findAll();
      return allClients;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
