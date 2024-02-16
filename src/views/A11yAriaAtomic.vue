<template>
  <p>
    <code>aria-atomic=BOOLEAN</code> is used to set whether or not the screen reader should always
    present the live region as a whole, even if only part of the region changes. The possible
    settings are: false or true. The default setting is false.
  </p>
  <p>
    Consider the situation where a clock is rendered, with the hour, minute and second each rendered
    as separate elements. Each element is individually replaced every 5 seconds with updated
    content.
  </p>
  <p>
    The first time the timer callback executes, the entirety of the string that is added will be
    announced. On subsequent calls, only the parts of the content that changed compared to the
    previous content will be announced. For instance, when the clock changes from "17:33:01" to
    "17:33:02", assistive technologies will only announce "34", which won't be very useful to users.
  </p>
  <a11y-example-aria-atomic :atomic="false" />
  <p>
    By specifying <code>aria-atomic=true</code>, we indicate that the element containing the hour,
    minute and second are an atomic group - and should be announced together.
  </p>
  <a11y-example-aria-atomic :atomic="true" />
</template>

<script setup lang="ts">
  import A11yExampleAriaAtomic from '../components/examples/A11yExampleAriaAtomic.vue';
</script>
