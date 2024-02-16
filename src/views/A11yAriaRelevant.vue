<template>
  <p>
    With aria-relevant you can specify which types of changes/updates to a live region should be
    announced.
  </p>
  <p>
    Consider the situation where a list of users is presented where we may add or remove them. We
    can ask that both additions and removals are announced by specifying
    <code>aria-relevant="additions removals"</code>.
  </p>
  <a11y-example-aria-relevant relevant="additions removals" />
  <p>
    We may only want additions to be announced by specifying <code>aria-relevant="additions"</code>.
  </p>
  <a11y-example-aria-relevant relevant="additions" />
  <p>
    Or we may only want removals to be announced by specifying
    <code>aria-relevant="removals"</code>.
  </p>
  <a11y-example-aria-relevant relevant="removals" />
</template>

<script setup lang="ts">
  import A11yExampleAriaRelevant from '../components/examples/A11yExampleAriaRelevant.vue';
</script>
