<template>
  <aside
    v-if="shouldShowSidebar"
    :class="`${is_expanded ? 'is-expanded' : ''}`"
  >
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">
          {{ is_expanded ? "chevron_right" : "menu" }}
        </span>
      </button>
    </div>
    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/home" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/cliente" class="button">
        <span class="material-icons">person</span>
        <span class="text">Clientes </span>
      </router-link>
      <router-link to="/produto" class="button">
        <span class="material-icons">inventory_2</span>
        <span class="text">Produtos</span>
      </router-link>
      <router-link to="/formaPagamento" class="button">
        <span class="material-icons">paid</span>
        <span class="text">Formas de Pagamento</span>
      </router-link>
      <router-link to="/venda" class="button">
        <span class="material-icons"> point_of_sale </span>
        <span class="text">Vendas</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <button @click="logOut" class="button">
        <span class="material-icons">logout</span>
        <span class="text">Finalizar sessão</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
let router = useRouter();
let route = useRoute();

const hasValidToken = computed(() => {
  return localStorage.getItem("token") !== null;
});

const shouldShowSidebar = computed(() => {
  console.log(route.path);
  return route.path !== "/login" && route.path !== "/register";
});

const logOut = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value.toString());
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  border-right: 0.3px solid black;
  background-color: var(--light);
  color: var(--light);
  position: fixed;
  left: 0;
  top: 0;
  width: calc(2rem + 30px);
  overflow: hidden;
  min-height: 100vh;
  padding: 0.8rem;

  transition: 0.3s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    position: static;
    top: 0;
    left: 0;
    transition: 0.2s ease-in-out;
    margin-left: 8px;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--dark-alt);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.1rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--dark);
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.7rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--dark-alt);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--dark-alt);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--sidebar-width);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--light);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--dark);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: 0rem;
      justify-content: flex-end;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    z-index: 99;
  }
}
</style>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Sidebar",
});
</script>
