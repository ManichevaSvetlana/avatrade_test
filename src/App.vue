<template>
  <OverlayComponent></OverlayComponent>
  <ModalComponent>
    <router-view />
  </ModalComponent>
</template>

<script setup lang="ts">
import OverlayComponent from "@/components/OverlayComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
</script>
