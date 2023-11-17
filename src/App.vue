<template>
  <OverlayComponent></OverlayComponent>
  <ModalComponent>
    <router-view />
  </ModalComponent>
</template>

<script setup lang="ts">
import OverlayComponent from "@/components/OverlayComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { useStore } from "vuex";

const store = useStore();
if (store.state.user.user.token) {
  store
    .dispatch("getUser")
    .catch((error) => console.error("Failed to fetch user details:", error));
}
</script>
