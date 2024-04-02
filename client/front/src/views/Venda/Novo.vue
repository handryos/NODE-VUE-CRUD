<template>
  <div class="main-container">
    <div class="container">
      <h1>Produtos</h1>
      <div style="overflow-y: auto; height: 32vh">
        <table class="table-container">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Incluir Produto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="state.produtos && state.produtos.length === 0">
              <td colspan="5">
                <h2 style="margin-top: 30px">Nenhum produto foi cadastrado!</h2>
              </td>
            </tr>
            <tr v-for="(product, index) in state.produtos" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ product.nome }}</td>
              <td>{{ product.preco }}</td>
              <td>{{ product.quantidade }}</td>
              <td>
                <button @click="incluirProduto(product)">
                  <span style="color: green" class="material-icons">
                    add_circle
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container-right">
      <h1>Informações Gerais</h1>
      <div style="overflow-y: auto; height: 30vh">
        <table id="selectionedProducts" class="table-container">
          <thead>
            <tr></tr>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Remover produto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in selectedProducts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ product.nome }}</td>
              <td>{{ product.preco }}</td>
              <td>
                <input
                  name="quantidade"
                  v-model="product.quantidade"
                  type="number"
                  @input="handleQuantityChange(product)"
                />
              </td>

              <td>
                <button @click="removeProduto(product)">
                  <span style="color: red" class="material-icons">
                    cancel
                  </span>
                </button>
              </td>
            </tr>

            <tr v-if="selectedProducts.length === 0">
              <td colspan="5">
                <h2 style="margin-top: 30px">Nenhum produto selecionado!</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container-end">
      <div class="total">
        <h3>Total:</h3>
      </div>
      <div class="total">
        <h3 style="font-weight: bold">R$ {{ this.state.total }}</h3>
      </div>
      <hr class="solid" />
      <div class="forma-pagamento">
        <h3>Forma de pagamento</h3>
      </div>
      <select
        v-model="state.formaPagamentoId"
        class="parcelas-input"
        name="formaPagamento"
        type="number"
      >
        <option
          style="margin-top: 10px"
          v-for="formaPagamento in state.formaPagamento"
          :key="formaPagamento.id"
          :value="formaPagamento.id"
        >
          Nome: {{ formaPagamento.nome }} - Nº de Parcelas:
          {{ formaPagamento.parcelas }}
        </option>
      </select>
      <div class="parcelas">
        <h3>Cliente</h3>
      </div>
      <select
        v-model="state.clienteId"
        class="parcelas-input"
        name="parcelas"
        type="number"
      >
        <option
          style="margin-top: 10px"
          v-for="cliente in state.clientes"
          :key="cliente.id"
          :value="cliente.id"
        >
          Nome: {{ cliente.nome }} - CPF: {{ cliente.cpf }}
        </option>
      </select>
      <span style="color: white"> sa </span>
      <button @click="save" class="button-save">
        <span style="color: white" class="material-icons"> save </span>
      </button>
    </div>
  </div>
</template>

<script>
import ClienteService from "@/services/CrudPadrao/Cliente/ClienteService";
import FormaPagamento from "@/services/CrudPadrao/FormaPagamento/FormaPagamentoService";
import ProdutoService from "@/services/CrudPadrao/Produto/ProdutoService";
import VendasServices from "@/services/CrudPadrao/Vendas/VendasServices";
import { reactive, onMounted, watch } from "vue";
import * as yup from "yup";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      selectedProducts: [],
    };
  },
  setup() {
    let router = useRouter();
    let state = reactive({
      produtos: [],
      formaPagamentoId: 1,
      total: 0,
      clienteId: 1,
      clientes: [],
      formaPagamento: [],
    });

    const schema = yup.object().shape({
      produtos: yup
        .array()
        .required("Selecione pelo menos um produto!")
        .test("produtos", "Selecione um produto!", (value) => {
          return value.length > 0;
        }),
    });

    onMounted(async () => {
      await getProdutos();
      await getClientes();
      getFormaPagamento();
    });

    watch(
      () => state.selectedProducts,
      (newValue, oldValue) => {
        state.total = newValue.reduce((acc, product) => {
          return acc + product.quantidade * product.preco;
        }, 0);
      }
    );

    async function getProdutos() {
      try {
        let produtos = await ProdutoService.getAllProdutos();
        state.produtos = produtos.data.data.map((produto) => ({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: produto.quantidade,
        }));
        state.produtos = produtos.data.data;
      } catch (error) {
        console.log(error);
      }
    }
    async function getClientes() {
      try {
        let clientes = await ClienteService.getAllClientes();
        state.clientes = clientes.data.data.map((cliente) => ({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    async function getFormaPagamento() {
      try {
        let formaPagamento = await FormaPagamento.getAllFormas();
        state.formaPagamento = formaPagamento.data.data.map(
          (formaPagamento) => ({
            id: formaPagamento.id,
            nome: formaPagamento.nome,
            parcelas: formaPagamento.parcelas,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    return { state, schema, router };
  },
  methods: {
    async save() {
      try {
        await this.schema.validate(
          {
            cliente: this.state.clienteId,
            produtos: this.selectedProducts,
            formaPagamento: this.state.formaPagamentoId,
          },
          { abortEarly: false }
        );
        let data = {
          total: this.selectedProducts.reduce((acc, product) => {
            this.state.total = acc + product.quantidade * product.preco;
            return acc + product.quantidade * product.preco;
          }, 0),
          produtos: this.selectedProducts.map((product) => ({
            codigo: product.id,
            quantidade: product.quantidade,
          })),
          formaPagamentoId: parseInt(this.state.formaPagamentoId),
          clienteId: parseInt(this.state.clienteId),
        };
        await VendasServices.save(data, this.router);
      } catch (error) {
        if (error.message.includes("vendas_formaPagamentoId_fkey")) {
          error.message =
            "É necessário cadastrar uma forma de pagamento para completar uma venda";
        }
        if (error.message.includes("vendas_clienteId_fkey")) {
          error.message =
            "É necessário cadastrar um cliente para completar uma venda";
        } else {
          error.message =
            "Erro ao salvar a venda! É necessário selecionar um cliente e um uma forma de pagamento para completar a venda! Caso não tenha ambos cadastrados, cadastre-os!";
        }
        useToast().error(error.message);
        console.log(error);
      }
    },
    handleQuantityChange(product) {
      this.state.total = this.selectedProducts.reduce((acc, p) => {
        return acc + p.quantidade * p.preco;
      }, 0);
    },
    incluirProduto(product) {
      if (!this.selectedProducts.some((p) => p.id === product.id)) {
        const index = this.state.produtos.findIndex((p) => p.id === product.id);
        this.selectedProducts.splice(index, 0, product);
        this.state.produtos.splice(index, 1);
        this.state.total += product.preco * product.quantidade;
      }
    },
    removeProduto(product) {
      const index = this.selectedProducts.findIndex((p) => p.id === product.id);
      this.selectedProducts.splice(index, 1);
      this.state.produtos.push(product);
      this.state.total -= product.preco * product.quantidade;
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #e2e2e2;
  height: 85vh;
  width: 90vw;
  display: grid;
  grid-template-columns: 30vw 25vw 15vw;
  grid-gap: 10px;
  row-gap: 1px;
  justify-content: center;
  align-items: center;
  margin: auto 8vw;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

select {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.forma-pagamento {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 4vh;
}
.parcelas {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 2vh;
}
.parcelas-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
select {
  appearance: none;
  width: 100%;
  font-size: 1rem;
  padding: 0.675em 6em 0.675em 1em;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
  cursor: pointer;
}
select option {
  margin-top: 10px;
  background-color: #fff;
  border: none;
  color: #333;
  font-weight: 500;
}

select option:hover {
  background-color: #f2f2f2;
}
.button-save {
  width: 100%;
  padding: 4px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-save:hover {
  background-color: #45a049;
}

.total {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 3vh;
}

hr.solid {
  border-top: 1px solid #bbb;
}

.container {
  grid-area: 1 / 1 / 2 / 2;
  padding: 10px;
  border: 1px solid #ddd;
  width: 30vw;
  height: 40vh;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.container-right {
  grid-area: 1 / 2 / 2 / 3;
  padding: 10px;
  border: 1px solid #ddd;
  width: 25vw;
  height: 40vh;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-left: 10px;
}

.container-end {
  grid-area: 1 / 3 / 2 / 4;
  padding: 10px;
  border: 1px solid #ddd;
  width: 15vw;
  height: 40vh;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-left: 1.2rem;
}

.info-container {
  margin-left: 200px;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
}

.table-container,
.table-container th,
.table-container td {
  border: 1px none #0c0a0a;
  text-align: center;
  padding: 10px;
  height: 45px;
}

.table-container th {
  background-color: #ffffff;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

.total-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid #ffffff;
}

.total-container div {
  display: flex;
  align-items: center;
}

.checkout-btn {
  background-color: #3055a1;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.checkout-btn:hover {
  background-color: #26498e;
}

.checkout-btn:disabled {
  background-color: #d3d3d3;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 600px) {
  .table-container,
  .total-container,
  .total-container div {
    margin-bottom: 10px;
  }

  .checkout-btn {
    margin-left: 0;
  }

  .table-container td,
  .table-container th {
    height: auto;
    padding: 10px;
    border: none;
    text-align: left;
  }

  .table-container th {
    background-color: #3055a1;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    color: #fff;
    padding: 10px;
  }

  .table-container tr:nth-child(2n) {
    background-color: #f2f2f2;
  }

  .table-container tr:last-child th,
  .table-container tr:last-child td {
    border-bottom: none;
  }

  .table-container th:first-child,
  .table-container td:first-child {
    border-left: 1px solid #ddd;
    padding: 10px;
  }

  .table-container th:last-child,
  .table-container td:last-child {
    border-right: none;
  }

  .table-container tr:last-child td:last-child {
    border-radius: 0 0 0 4px;
  }

  .table-container tr:first-child td:first-child {
    border-radius: 4px 0 0 0;
  }

  .table-container tr {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .total-container {
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .checkout-btn {
    background-color: #3055a1;
    border: none;
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
  }

  .checkout-btn:hover {
    background-color: #26498e;
  }

  .checkout-btn:disabled {
    background-color: #d3d3d3;
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
