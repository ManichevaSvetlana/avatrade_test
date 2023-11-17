<template>
  <div class="relative flex flex-col">
    <input
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :type="props.type || 'text'"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      class="text-black font-normal rounded-sm border pl-13 pr-3 py-4 text-base"
      :class="{ 'border-red': error }"
      :autocomplete="props.autocomplete"
    />
    <span
      v-if="iconComponent"
      class="absolute left-3 top-4 text-blue"
      :class="{ 'text-red': error }"
    >
      <component :is="iconComponent" />
    </span>
    <slot name="icon-right"></slot>
    <small
      class="text-sm text-red text-left mt-1 opacity-0"
      :class="{ 'opacity-100': error }"
    >
      {{ props.error }}&nbsp;
    </small>
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
  autocomplete?: string;
}>();

const emits = defineEmits(["update:modelValue", "input", "change", "blur"]);

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emits("update:modelValue", value);
  emits("input", value);
};

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emits("change", value);
};

const handleBlur = (event: Event) => {
  emits("blur", event);
};

const iconComponent = computed(() => {
  const iconsMap = {
    "email-icon": EmailIcon,
    "key-icon": KeyIcon,
  };
  return iconsMap[props.icon];
});
</script>
