import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Register/Register.vue";
import VendaNovo from "@/views/Venda/Novo.vue";
import VendaEditar from "@/views/Venda/Editar.vue";
import VendaGrid from "@/views/Venda/VendaGrid.vue";
import ClienteGrid from "@/views/Cliente/ClienteGrid.vue";
import ClienteNovo from "@/views/Cliente/Novo.vue";
import ClienteEditar from "@/views/Cliente/Editar.vue";
import FormaPagamentoGrid from "@/views/FormaPagamento/FormaPagamentoGrid.vue";
import ProdutoGrid from "@/views/Produto/ProdutoGrid.vue";
import FormaPagamentoNovo from "@/views/FormaPagamento/Novo.vue";
import ProdutoNovo from "@/views/Produto/Novo.vue";
import ProdutoEditar from "@/views/Produto/Editar.vue";
import FormaPagamentoEditar from "@/views/FormaPagamento/Editar.vue";
import Home from "@/views/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/venda",
      name: "venda",
      component: VendaGrid,
    },
    {
      path: "/venda/novo",
      name: "vendaNovo",
      component: VendaNovo,
    },
    {
      path: "/venda/editar/:id",
      name: "vendaEditar",
      component: VendaEditar,
    },
    {
      path: "/cliente",
      name: "cliente",
      component: ClienteGrid,
    },
    {
      path: "/cliente/novo",
      name: "clienteNovo",
      component: ClienteNovo,
    },
    {
      path: "/cliente/editar/:id",
      name: "clienteEditar",
      component: ClienteEditar,
    },
    {
      path: "/formaPagamento",
      name: "formaPagamento",
      component: FormaPagamentoGrid,
    },
    {
      path: "/formaPagamento/novo",
      name: "formaPagamentoNovo",
      component: FormaPagamentoNovo,
    },
    {
      path: "/formaPagamento/editar/:id",
      name: "formaPagamentoEditar",
      component: FormaPagamentoEditar,
    },
    {
      path: "/cliente/editar/:id",
      name: "clienteEditar",
      component: ClienteEditar,
    },
    {
      path: "/produto",
      name: "produto",
      component: ProdutoGrid,
    },
    {
      path: "/produto/novo",
      name: "produtoNovo",
      component: ProdutoNovo,
    },
    {
      path: "/produto/editar/:id",
      name: "produtoEditar",
      component: ProdutoEditar,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.path !== "/login" && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
