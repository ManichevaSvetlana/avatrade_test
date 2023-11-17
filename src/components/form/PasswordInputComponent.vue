<template>
  <InputComponent
    :type="isPasswordVisible ? 'text' : 'password'"
    :placeholder="props.placeholder"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
    :icon="props.icon"
    :error="props.error"
    v-model="val"
    autocomplete="current-password"
  >
    <template #icon-right>
      <span
        class="absolute right-3 top-4 pointer"
        @click="togglePasswordVisibility"
      >
        <HideEyeIcon v-if="!isPasswordVisible" class="text-gray" />
        <ShowEyeIcon v-else class="text-gray" />
      </span>
    </template>
  </InputComponent>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from "vue";
import InputComponent from "@/components/form/InputComponent.vue";
import HideEyeIcon from "@/components/icons/HideEyeIcon.vue";
import ShowEyeIcon from "@/components/icons/ShowEyeIcon.vue";

const props = defineProps<{
  modelValue: string;
  placeholder: string;
  icon: "email-icon" | "key-icon";
  error?: string;
}>();

const emits = defineEmits(["update:modelValue", "input", "change", "blur"]);
const isPasswordVisible = ref(false);
const val = ref(props.modelValue);

const handleInput = () => {
  emits("update:modelValue", val.value);
  emits("input", val.value);
};

const handleChange = () => {
  emits("change", val.value);
};

const handleBlur = (event: Event) => {
  emits("blur", event);
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

watch(
  () => props.modelValue,
  (newValue) => {
    val.value = newValue;
  }
);
</script>
