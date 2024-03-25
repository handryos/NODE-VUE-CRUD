<template>
  <div style="overflow-x: hidden; overflow-y: hidden">
    <DynamicTable :hrWidth="hrWidth" :columns="columns" />
  </div>
</template>

<script>
import DynamicTable from "../../components/grid/ClienteGrid/Grid.vue";

export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      columns: ["Ações", "Nome", "CPF", "Cidade", "Estado"],
      hrWidth: "8.8vw",
    };
  },
};
</script>
