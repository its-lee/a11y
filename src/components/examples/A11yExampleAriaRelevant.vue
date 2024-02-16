<template>
  <a11y-example>
    <template #controls>
      <div class="flex flex-direction-row gap-1">
        <a11y-button text="Add a user" @click="onAddUser" />
        <a11y-button text="Remove a user" @click="onRemoveUser" />
      </div>
    </template>
    <div aria-live="assertive" :aria-relevant="relevant">
      <div v-for="user in users" :key="user">{{ user }}</div>
    </div>
  </a11y-example>
</template>

<script setup lang="ts">
  import type { AriaAttributes, PropType } from 'vue';
  import { ref } from 'vue';

  import A11yButton from '../utility/A11yButton.vue';
  import A11yExample from '../utility/A11yExample.vue';

  defineProps({
    relevant: {
      type: String as PropType<AriaAttributes['aria-relevant']>,
      required: true
    }
  });

  const users = ref<string[]>(['Thomas Brady', 'Peter Yuppie', 'Kenneth Tomlinson']);
  const newUserIndex = ref<number>(0);

  const onAddUser = (): void => {
    ++newUserIndex.value;
    users.value.push(`New User #${newUserIndex.value}`);
  };

  const onRemoveUser = (): void => {
    users.value.pop();
  };
</script>
