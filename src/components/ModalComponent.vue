<template>
  <div class="fixed inset-0 flex items-center justify-center p-4">
    <div
      class="shadow-lg flex w-full mx-auto my-auto max-w-full h-screen lg:max-w-[60%] lg:h-auto min-h-4/5"
    >
      <div
        class="w-2/5 bg-blue-100 rounded-lg rounded-r-none hidden lg:block"
      ></div>
      <div
        class="w-full lg:w-3/5 bg-white p-6 flex flex-col justify-center overflow-auto"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
