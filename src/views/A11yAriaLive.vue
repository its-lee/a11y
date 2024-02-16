<template>
  <p>
    Dynamic content which updates without a page reload is generally either a region or a widget.
    Simple content changes which are not interactive should be marked as live regions. A live region
    is explicitly denoted using the <code>aria-live</code> attribute.
  </p>
  <p>
    <strong><code>aria-live</code></strong
    >: The <code>aria-live=POLITENESS_SETTING</code> is used to set the priority with which screen
    reader should treat updates to live regions - the possible settings are: <code>off</code>,
    <code>polite</code> or <code>assertive</code>. The default setting is <code>off</code>. This
    attribute is by far the most important.
  </p>
  <p>
    Normally, only <code>aria-live="polite"</code> is used. Any region which receives updates that
    are important for the user to receive, but not so rapid as to be annoying, should receive this
    attribute. The screen reader will speak changes whenever the user is idle.
  </p>
  <a11y-example-aria-live live="polite" />
  <p>
    <code>aria-live="assertive"</code> should only be used for time-sensitive/critical notifications
    that absolutely require the user's immediate attention. Generally, a change to an assertive live
    region will interrupt any announcement a screen reader is currently making. As such, it can be
    extremely annoying and disruptive and should only be used sparingly.
  </p>
  <a11y-example-aria-live live="assertive" />
  <p>
    As <code>aria-live="off"</code> is the assumed default for elements, it should not be necessary
    to set this explicitly, unless you're trying to suppress the announcement of elements which have
    an implicit live region role (such as <code>role="alert"</code>).
  </p>
  <a11y-example-aria-live live="off" />
</template>

<script setup lang="ts">
  import A11yExampleAriaLive from '../components/examples/A11yExampleAriaLive.vue';
</script>
