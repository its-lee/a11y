<template>
  <button
    class="a11y-button cursor-pointer user-select-none br-10 py-1 px-2 width-max-content background-color-blue-1 background-color-hover-blue-4-o-75 color-white text-body-reg ellipsis max-width-100"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .a11y-button {
    border: none;
  }
</style>
