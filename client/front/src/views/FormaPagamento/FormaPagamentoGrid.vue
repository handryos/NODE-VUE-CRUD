<template>
  <div style="overflow-x: hidden; overflow-y: hidden">
    <DynamicTable :hrWidth="hrWidth" :columns="columns" />
  </div>
</template>

<script>
import DynamicTable from "../../components/grid/FormaPagamentoGrid/Grid.vue";

export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: ["Ações", "Nome", "Parcelas"],
      hrWidth: "15.5vw",
    };
  },
};
</script>
