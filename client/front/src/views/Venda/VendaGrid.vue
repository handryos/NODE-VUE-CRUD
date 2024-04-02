<template>
  <div style="overflow-x: hidden; overflow-y: hidden">
    <DynamicTable :hrWidth="hrWidth" :columns="columns" />
  </div>
</template>

<script>
import DynamicTable from "../../components/grid/Grid.vue";

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
      hrWidth: "6.8vw",
    };
  },
};
</script>
