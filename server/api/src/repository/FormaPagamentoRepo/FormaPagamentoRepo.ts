import { FormaPagamento } from "../../models/FormaPagamento";

interface IFormaPagamentoRepo {
  save(formaPagamento: FormaPagamento): Promise<void>;
  update(formaPagamento: FormaPagamento): Promise<void>;
  delete(formaPagamento: FormaPagamento): Promise<void>;
  getById(formaPagamento: FormaPagamento): Promise<FormaPagamento>;
  getAll(): Promise<FormaPagamento[]>;
}

export class FormaPagamentoRepo implements IFormaPagamentoRepo {
  async save(formaPagamento: FormaPagamento): Promise<void> {
    try {
      await FormaPagamento.create({
        nome: formaPagamento.nome,
        parcelas: formaPagamento.parcelas,
      });
    } catch (error: any) {
      throw new Error(
        "Falha ao cadastrar a forma de pagamento!" + error.message
      );
    }
  }

  async update(formaPagamento: FormaPagamento): Promise<void> {
    try {
      const updateForma = await FormaPagamento.findOne({
        where: {
          id: formaPagamento.id,
        },
      });
      if (!updateForma) {
        throw new Error("Forma de pagamento inexistente!");
      }
      updateForma.nome = formaPagamento.nome;
      updateForma.parcelas = formaPagamento.parcelas;

      await updateForma.save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async delete(formaPagamento: FormaPagamento): Promise<void> {
    try {
      const selectedForma = await FormaPagamento.findOne({
        where: {
          id: formaPagamento.id,
        },
      });
      if (!selectedForma) {
        throw new Error("Forma de pagamento inexistente!");
      }
      await selectedForma.destroy();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getById(formaPagamento: FormaPagamento): Promise<FormaPagamento> {
    try {
      const selectedForma = await FormaPagamento.findOne({
        where: {
          id: formaPagamento.id,
        },
      });
      if (!selectedForma) {
        throw new Error("Forma de pagamento inexistente!");
      }
      return selectedForma;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<FormaPagamento[]> {
    try {
      let allFormas = await FormaPagamento.findAll();
      return allFormas;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
