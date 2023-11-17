<template>
  <button
    :class="{
      'rounded-xl bg-blue py-3.5 px-9.5 text-white text-center pointer hover:bg-dark-500 focus:bg-blue-500 disabled:opacity-35 border-none text-lg': true,
      'loading-class': props.loading,
    }"
    :disabled="props.loading || props.disabled"
  >
    <span v-if="loading">Loading...</span>
    <slot v-else></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  loading: boolean;
  disabled?: boolean;
}>();
</script>
