import { ref, Ref } from "vue";

interface ValidationResponse {
  errors: Ref<{ [key: string]: string }>;
  validate: (field: string, value: string) => boolean;
  validateAll: (values: string[]) => boolean;
  clearValidation: (field: string) => void;
}
export function useValidation(): ValidationResponse {
  const errors = ref<{ [key: string]: string }>({});

  function validate(field: string, value: string): boolean {
    if (value.trim() === "") {
      errors.value[field] = "This field is required";
      return false;
    } else {
      errors.value[field] = "";
      return true;
    }
  }

  function clearValidation(field: string): void {
    if (errors.value[field]) {
      errors.value[field] = "";
    }
  }

  function validateAll(values: string[]): boolean {
    return values.every((value) => value.trim() !== "");
  }

  return {
    errors,
    validate,
    clearValidation,
    validateAll,
  };
}
