import { Request, Response } from "express";
import { FormaPagamento } from "../../models/FormaPagamento";
import { FormaPagamentoRepo } from "../../repository/FormaPagamentoRepo/FormaPagamentoRepo";

class FormaPagamentoController {
  async create(req: Request, res: Response) {
    try {
      const new_formaPagamento = new FormaPagamento();
      new_formaPagamento.nome = req.body.nome;
      new_formaPagamento.parcelas = req.body.parcelas;

      await new FormaPagamentoRepo().save(new_formaPagamento);

      res.status(200).json({
        status: "Sucesso!",
        message: "Forma de psagamento Cadastrado com Sucesso!",
        formaPagamento: new_formaPagamento,
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
      const formaPagamento = new FormaPagamento();
      formaPagamento.id = id;
      formaPagamento.nome = req.body.nome;
      formaPagamento.parcelas = req.body.parcelas;

      await new FormaPagamentoRepo().update(formaPagamento);

      res.status(200).json({
        status: "Sucesso!",
        formaPagamento: formaPagamento,
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

      const formaPagamento = new FormaPagamento();
      formaPagamento.id = id;

      await new FormaPagamentoRepo().delete(formaPagamento);

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

      const formaPagamento = new FormaPagamento();
      formaPagamento.id = id;

      let responseFormaPagamento = await new FormaPagamentoRepo().getById(
        formaPagamento
      );

      res.status(200).json({
        status: "Sucesso!",
        data: responseFormaPagamento,
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
      const formaPagamento = await new FormaPagamentoRepo().getAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successo",
        data: formaPagamento,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new FormaPagamentoController();
