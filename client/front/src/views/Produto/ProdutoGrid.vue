<template>
  <div style="overflow-x: hidden; overflow-y: hidden">
    <DynamicTable :hrWidth="hrWidth" :columns="columns" />
  </div>
</template>

<script>
import DynamicTable from "../../components/grid/ProdutoGrid/Grid.vue";

export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: ["Ações", "Nome", "Quantidade", "Preço Unitário"],
      hrWidth: "10.9vw",
    };
  },
};
</script>
