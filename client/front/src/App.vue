<script setup lang="ts">
import { mapActions, storeToRefs } from "pinia";
import Sidebar from "./components/menu/SideBar.vue";

import { useAuthenticationStore } from "./store/authStore";

let store = storeToRefs(useAuthenticationStore());
</script>

<template>
  <div style="display: flex; justify-content: center">
    <RouterView />
    <Sidebar />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

body {
  background: var(--light);
}
</style>
