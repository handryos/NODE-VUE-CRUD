import ClienteController from "../controllers/Cliente/ClienteController";
import VendaController from "../controllers/Venda/VendaController";
import ProdutoController from "../controllers/Produto/ProdutoController";
import FormaPagamentoController from "../controllers/FormaPagamento/FormaPagamentoController";
import BaseRoutes from "./base/BaseRouier";
import AuthController from "../controllers/AuthController";

class AppRoutes extends BaseRoutes {
  public routes(): void {
    // Cliente routes
    this.router.put(
      "/cliente/editar/:id",
      AuthController.isAuthenticated,
      ClienteController.update
    );
    this.router.post(
      "/cliente/novo",
      AuthController.isAuthenticated,
      ClienteController.create
    );
    this.router.delete(
      "/cliente/delete/:id",
      AuthController.isAuthenticated,
      ClienteController.delete
    );
    this.router.get(
      "/cliente/filtradoAll",
      AuthController.isAuthenticated,
      ClienteController.findAll
    );
    this.router.get(
      "/cliente/filtrado/:id",
      AuthController.isAuthenticated,
      ClienteController.getById
    );

    // Venda routes
    this.router.get(
      "/venda/filtradoAll",
      AuthController.isAuthenticated,
      VendaController.getAll
    );
    this.router.post(
      "/venda/novo",
      AuthController.isAuthenticated,
      VendaController.create
    );
    this.router.post(
      "/venda/editar/:id",
      AuthController.isAuthenticated,
      VendaController.update
    );
    this.router.get(
      "/venda/filtrado/:id",
      AuthController.isAuthenticated,
      VendaController.getById
    );
    this.router.delete(
      "/venda/delete/:id",
      AuthController.isAuthenticated,
      VendaController.delete
    );

    // Produto routes
    this.router.put(
      "/produto/editar/:id",
      AuthController.isAuthenticated,
      ProdutoController.update
    );
    this.router.post(
      "/produto/novo",
      AuthController.isAuthenticated,
      ProdutoController.create
    );
    this.router.delete(
      "/produto/delete/:id",
      AuthController.isAuthenticated,
      ProdutoController.delete
    );
    this.router.get(
      "/produto/filtradoAll",
      AuthController.isAuthenticated,
      ProdutoController.findAll
    );
    this.router.get(
      "/produto/filtrado/:id",
      AuthController.isAuthenticated,
      ProdutoController.getById
    );

    // FormaPagamento routes
    this.router.put(
      "/formaPagamento/editar/:id",
      AuthController.isAuthenticated,
      FormaPagamentoController.update
    );
    this.router.post(
      "/formaPagamento/novo",
      AuthController.isAuthenticated,
      FormaPagamentoController.create
    );
    this.router.delete(
      "/formaPagamento/delete/:id",
      AuthController.isAuthenticated,
      FormaPagamentoController.delete
    );
    this.router.get(
      "/formaPagamento/filtradoAll",
      AuthController.isAuthenticated,
      FormaPagamentoController.findAll
    );
    this.router.get(
      "/formaPagamento/filtrado/:id",
      AuthController.isAuthenticated,
      FormaPagamentoController.getById
    );
  }
}

export default new AppRoutes().router;
