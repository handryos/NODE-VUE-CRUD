import { Request, Response } from "express";
import { Produto } from "../../models/Produto";
import { ProdutoRepo } from "../../repository/ProdutoRepo/ProdutoRepo";

class ProdutoController {
  async create(req: Request, res: Response) {
    try {
      const new_produto = new Produto();
      new_produto.nome = req.body.nome;
      new_produto.quantidade = req.body.quantidade;
      new_produto.preco = req.body.preco;

      await new ProdutoRepo().save(new_produto);

      res.status(200).json({
        status: "Sucesso!",
        message: "Produto Cadastrado com Sucesso!",
        produto: new_produto,
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
      const produto = new Produto();
      produto.id = id;
      produto.nome = req.body.nome;
      produto.quantidade = req.body.quantidade;
      produto.preco = req.body.preco;

      await new ProdutoRepo().update(produto);

      res.status(200).json({
        status: "Sucesso!",
        produto: produto,
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

      const produto = new Produto();
      produto.id = id;

      await new ProdutoRepo().delete(produto);

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

      const produto = new Produto();
      produto.id = id;

      let responseProduto = await new ProdutoRepo().getById(produto);

      res.status(200).json({
        status: "Sucesso!",
        data: responseProduto,
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
      const produto = await new ProdutoRepo().getAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successo",
        data: produto,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new ProdutoController();
