<template>
  <section
    class="a11y-example background-color-grey-2 p-2 mt-2 mb-4 br-5 flex flex-direction-column gap-1"
  >
    <div class="flex flex-direction-column gap-1">
      <div>
        <slot name="controls" />
        <div v-if="$slots.controls && $slots.default" class="a11y-example-divider mt-2" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .a11y-example {
    &-divider {
      content: ' ';
      border-bottom: solid 1px map-get($colours, 'grey-1');
    }
  }
</style>
