import { NextFunction, Request, Response } from "express";
import { Cliente } from "../../models/Cliente";
import { ClienteRepo } from "../../repository/ClienteRepository/ClienteRepo";

class ClienteController {
  async create(req: Request, res: Response) {
    try {
      const new_cliente = new Cliente();
      new_cliente.nome = req.body.nome;
      new_cliente.cpf = req.body.cpf;
      new_cliente.endereco = req.body.endereco;
      new_cliente.email = req.body.email;

      await new ClienteRepo().save(new_cliente);

      res.status(200).json({
        status: "Sucesso!",
        message: "Cliente Cadastrado com Sucesso!",
        user: new_cliente,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);

      const cliente = new Cliente();
      cliente.id = id;
      cliente.nome = req.body.nome;
      cliente.cpf = req.body.cpf;
      cliente.endereco = req.body.endereco;
      cliente.email = req.body.email;

      await new ClienteRepo().update(cliente);

      res.status(200).json({
        status: "Sucesso!",
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);

      const cliente = new Cliente();
      cliente.id = id;

      await new ClienteRepo().delete(cliente);

      res.status(200).json({
        status: "Sucesso!",
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);

      const cliente = new Cliente();
      cliente.id = id;

      let responseCliente = await new ClienteRepo().getById(cliente);

      res.status(200).json({
        status: "Sucesso!",
        data: responseCliente,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const clients = await new ClienteRepo().getAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successo",
        data: clients,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new ClienteController();
