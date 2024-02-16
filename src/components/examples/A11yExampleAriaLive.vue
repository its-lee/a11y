<template>
  <a11y-example>
    <template #controls>
      <a11y-button :text="`Click here for updates to aria-live=${live}`" @click="index++" />
    </template>
    <div :aria-live="live">{{ text }}</div>
  </a11y-example>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { AriaAttributes } from 'vue';
  import { computed, ref } from 'vue';

  import A11yButton from '../utility/A11yButton.vue';
  import A11yExample from '../utility/A11yExample.vue';

  defineProps({
    live: {
      type: String as PropType<AriaAttributes['aria-live']>,
      required: true
    }
  });

  const TEXT = [
    'Initial text',
    'Some text update',
    'Another text update',
    'Yet another text update'
  ] as const;

  const index = ref<number>(0);

  const text = computed<string>(() => TEXT[index.value % TEXT.length] || '');
</script>
