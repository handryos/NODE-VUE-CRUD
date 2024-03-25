import { Cliente } from "../../models/Cliente";
import { Venda } from "../../models/Venda";
import { Produto } from "../../models/Produto";
import { FormaPagamento } from "../../models/FormaPagamento";

export class VendaRepo {
  async save(
    produtos: { codigo: number; quantidade: number }[],
    formaPagamentoId: number,
    total: number,
    clienteId: number
  ): Promise<void> {
    try {
      const venda = new Venda();
      venda.produtos = produtos.map((item) => ({
        codigo: item.codigo,
        quantidade: item.quantidade,
      }));
      venda.formaPagamentoId = formaPagamentoId;
      venda.total = total;
      venda.clienteId = clienteId;

      for (const item of produtos) {
        const produto = await Produto.findByPk(item.codigo);
        if (!produto) {
          throw new Error(`Produto com o ID ${item.codigo} não encontrado.`);
        }
        if (item.quantidade > produto.quantidade) {
          throw new Error(
            `O produto ${produto.nome} possui apenas ${produto.quantidade} unidades em estoque. Verifique!`
          );
        }
        produto.quantidade -= item.quantidade;
        await produto.save();
      }

      await venda.save();
    } catch (error) {
      console.error("Erro ao salvar a venda:", error);
      throw error;
    }
  }

  async update(
    vendaId: number,
    produtos: { codigo: number; quantidade: number }[],
    formaPagamentoId: number,
    total: number,
    clienteId: number
  ): Promise<void> {
    try {
      const vendaToUpdate = await Venda.findByPk(vendaId);
      if (!vendaToUpdate) {
        throw new Error("Venda não encontrada.");
      }

      for (const item of produtos) {
        const produto = await Produto.findByPk(item.codigo);
        if (!produto) {
          throw new Error(`Produto como  ID ${item.codigo} não encontrado.`);
        }
        if (item.quantidade > produto.quantidade) {
          throw new Error(
            `Não foi possível completar essa venda, esse produto tem apenas ${produto.quantidade} em estoque.`
          );
        }

        produto.quantidade -= item.quantidade;
        await produto.save();
      }

      vendaToUpdate.produtos = produtos.map((item) => ({
        codigo: item.codigo,
        quantidade: item.quantidade,
      }));
      vendaToUpdate.formaPagamentoId = formaPagamentoId;
      vendaToUpdate.total = total;
      vendaToUpdate.clienteId = clienteId;
      await vendaToUpdate.save();
    } catch (error) {
      console.error("Error updating venda:", error);
      throw error;
    }
  }
  async delete(venda: Venda): Promise<void> {
    try {
      const vendaSelected = await Venda.findOne({
        where: {
          id: venda.id,
        },
      });
      if (!vendaSelected) {
        throw new Error("Venda inexistente!");
      }
      await vendaSelected.destroy();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getById(venda: Venda): Promise<Venda> {
    try {
      const vendaSelected = await Venda.findOne({
        where: {
          id: venda.id,
        },
      });
      if (!vendaSelected) {
        throw new Error("Venda inexistente!");
      }

      const produtos = await Promise.all(
        vendaSelected.produtos.map(async (produto) => {
          const produtoDetails = await Produto.findOne({
            where: { id: produto.codigo },
          });
          return {
            codigo: produto.codigo,
            quantidade: produto.quantidade,
            nome: produtoDetails ? produtoDetails.nome : null,
            preco: produtoDetails ? produtoDetails.preco : null,
          };
        })
      );

      vendaSelected.produtos = produtos;

      return vendaSelected;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<any[]> {
    try {
      let allVendas = await Venda.findAll();

      const allVendasWithDetails = await Promise.all(
        allVendas.map(async (venda) => {
          const cliente = await Cliente.findByPk(venda.dataValues.clienteId);
          const produtosDetails = await Promise.all(
            venda.dataValues.produtos.map(async (produto) => {
              const produtoDetails = await Produto.findOne({
                where: { id: produto.codigo },
              });
              return {
                codigo: produto.codigo,
                quantidade: produto.quantidade,
                nome: produtoDetails ? produtoDetails.nome : null,
              };
            })
          );
          const formaPagamento = await FormaPagamento.findByPk(
            venda.dataValues.formaPagamentoId
          );

          return {
            venda: {
              id: venda.dataValues.id,
              total: venda.dataValues.total,
              formaPagamento: formaPagamento?.dataValues,
              cliente: cliente?.dataValues,
              produtos: produtosDetails,
            },
          };
        })
      );
      return allVendasWithDetails;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
