<template>
  <div class="relative flex flex-col">
    <input
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :type="props.type || 'text'"
      @input="handleInput"
      @change="handleChange"
      class="text-black font-normal rounded-sm border pl-13 pr-3 py-4 text-base"
    />
    <span v-if="iconComponent" class="absolute left-3 top-4 text-blue">
      <component :is="iconComponent" />
    </span>
    <slot name="icon-right"></slot>
    <small v-if="error" class="error-text">{{ props.error }}</small>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import KeyIcon from "@/components/icons/KeyIcon.vue";

const props = defineProps<{
  modelValue: string;
  placeholder: string;
  icon: "email-icon" | "key-icon";
  error?: string;
  type?: "text" | "password";
}>();

const emits = defineEmits(["update:modelValue", "input", "change"]);

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emits("update:modelValue", value);
  emits("input", value);
};

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emits("change", value);
};

const iconComponent = computed(() => {
  const iconsMap = {
    "email-icon": EmailIcon,
    "key-icon": KeyIcon,
  };
  return iconsMap[props.icon];
});
</script>

<style scoped>
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
