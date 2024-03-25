import { Produto } from "../../models/Produto";

interface IProdutoRepo {
  save(produto: Produto): Promise<void>;
  update(produto: Produto): Promise<void>;
  delete(produto: Produto): Promise<void>;
  getById(produto: Produto): Promise<Produto>;
  getAll(): Promise<Produto[]>;
}

export class ProdutoRepo implements IProdutoRepo {
  async save(produto: Produto): Promise<void> {
    try {
      await Produto.create({
        nome: produto.nome,
        quantidade: produto.quantidade,
        preco: produto.preco,
      });
    } catch (error: any) {
      throw new Error("Falha ao cadastrar o produto!" + error.message);
    }
  }

  async update(produto: Produto): Promise<void> {
    try {
      const updateProduto = await Produto.findOne({
        where: {
          id: produto.id,
        },
      });
      if (!updateProduto) {
        throw new Error("Produto inexistente!");
      }
      updateProduto.nome = produto.nome;
      updateProduto.quantidade = produto.quantidade;
      updateProduto.preco = produto.preco;

      await updateProduto.save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async delete(produto: Produto): Promise<void> {
    try {
      const selectedProduto = await Produto.findOne({
        where: {
          id: produto.id,
        },
      });
      if (!selectedProduto) {
        throw new Error("Produto inexistente!");
      }
      await selectedProduto.destroy();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getById(produto: Produto): Promise<Produto> {
    try {
      const selectedProduto = await Produto.findOne({
        where: {
          id: produto.id,
        },
      });
      if (!selectedProduto) {
        throw new Error("Produto inexistente!");
      }
      return selectedProduto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<Produto[]> {
    try {
      let allProdutos = await Produto.findAll();
      return allProdutos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
