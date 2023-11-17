<script setup lang="ts">
import { computed, defineProps } from "vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import AppleIcon from "@/components/icons/AppleIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";

const props = defineProps<{
  icon: "google-icon" | "facebook-icon" | "apple-icon";
}>();

const iconComponent = computed(() => {
  const iconsMap = {
    "google-icon": GoogleIcon,
    "facebook-icon": FacebookIcon,
    "apple-icon": AppleIcon,
  };
  return iconsMap[props.icon];
});
</script>

<template>
  <div
    class="icon-container rounded-full bg-white shadow pointer hover:shadow-xl"
  >
    <component :is="iconComponent" class="icon" />
  </div>
</template>
