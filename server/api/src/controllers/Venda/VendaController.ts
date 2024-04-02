import { Request, Response } from "express";
import { VendaRepo } from "../../repository/VendaRepository/VendaRepo";
import { Venda } from "../../models/Venda";

class VendaController {
  async create(req: Request, res: Response) {
    try {
      const produtos = req.body.produtos;
      const formaPagamentoId = req.body.formaPagamentoId;
      const total = req.body.total;
      const cliente = req.body.clienteId;

      let venda = await new VendaRepo().save(
        produtos,
        formaPagamentoId,
        total,
        cliente
      );

      res.status(200).json({
        status: "Successo!",
        message: "Venda cadastrada!",
        venda: venda,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clients = await new VendaRepo().getAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successo",
        data: clients,
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
      const vendaId = parseInt(req.url.split("/")[3]);
      const produtos = req.body.produtos;
      const formaPagamentoId = req.body.formaPagamentoId;
      const total = req.body.total;
      const cliente = req.body.clienteId;

      let venda = await new VendaRepo().update(
        vendaId,
        produtos,
        formaPagamentoId,
        total,
        cliente
      );

      res.status(200).json({
        status: "Success!",
        message: "Venda updated!",
        venda: venda,
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

      const venda = new Venda();
      venda.id = id;

      await new VendaRepo().delete(venda);

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

      const venda = new Venda();
      venda.id = id;

      let responseVenda = await new VendaRepo().getById(venda);

      res.status(200).json({
        status: "Sucesso!",
        data: responseVenda,
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
      const vendas = await new VendaRepo().getAll();
      console.log(vendas);

      res.status(200).json({
        status: "Ok!",
        message: "Successo",
        data: vendas,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Sesrver Error!",
      });
    }
  }
}

export default new VendaController();
