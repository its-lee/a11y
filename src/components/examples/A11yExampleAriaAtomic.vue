<template>
  <a11y-example>
    <template #controls>
      <a11y-button
        :text="`${running ? 'Stop' : 'Start'} the clock with aria-atomic=${atomic}`"
        @click="running = !running"
      />
    </template>
    <div v-if="time" aria-live="assertive" :aria-atomic="atomic">
      <span>{{ time.hour }}</span>
      <span>:</span>
      <span>{{ time.minute }}</span>
      <span>:</span>
      <span>{{ time.second }}</span>
    </div>
  </a11y-example>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  import A11yButton from '../utility/A11yButton.vue';
  import A11yExample from '../utility/A11yExample.vue';

  defineProps({
    atomic: {
      type: Boolean,
      required: true
    }
  });

  type Time = { hour: string; minute: string; second: string };

  const running = ref<boolean>(false);
  const intervalId = ref<number | undefined>(undefined);
  const time = ref<Time | undefined>(undefined);

  const formatTimePart = (value: number): string => value.toString().padStart(2, '0');

  const setTime = (): void => {
    const datetime = new Date();
    time.value = {
      hour: formatTimePart(datetime.getHours()),
      minute: formatTimePart(datetime.getMinutes()),
      second: formatTimePart(datetime.getSeconds())
    };
  };

  watch(running, value => {
    if (value) {
      setTime();
      intervalId.value = setInterval(() => setTime(), 5000);
    } else {
      clearInterval(intervalId.value);
    }
  });

  onMounted(() => setTime());
</script>
