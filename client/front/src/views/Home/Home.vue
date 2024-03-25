<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
    "
  >
    <h1>Home page</h1>
  </div>
</template>

<script>
import DynamicTable from "@/components/grid/Grid.vue";

export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: [
        "Ações",
        "Cliente",
        "Produtos",
        "Forma de Pagamento",
        "Parcelas",
        "Total",
      ],
      hrWidth: "6.7vw",
    };
  },
};
</script>
