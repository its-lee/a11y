<template>
  <p>
    Drag and drop has becoming increasingly popular as a complex user interaction since it was
    introduced. However, it does pose challenges in accessibility - e.g. for users who don't have
    use of a pointing device for drag and drop interactions.
  </p>
  <p>We've implemented some common patterns to make these interactions more accessible.</p>
  <h2>Reordering a list</h2>
  <p>In addition to being able to re-order this list with a mouse, it can also be used by:</p>
  <ol class="ordered-list-bullet">
    <li>Tab / Shift-Tab into the list and select an item</li>
    <li>Press Space to enter into drag mode</li>
    <li>Use the arrow keys to select a new position</li>
    <li>Press Space to enter to drop the item into its new position</li>
  </ol>
  <a11y-example-drag-and-drop-list />
  <h2>Assigning between lists</h2>
  <p>
    In addition to being able to assign items between different lists with a mouse, it can also be
    used by:
  </p>
  <ol class="ordered-list-bullet">
    <li>Tab / Shift-Tab into the multi-list and select an item</li>
    <li>Press Space to enter into drag mode</li>
    <li>Use the arrow keys to select a new position</li>
    <li>Press Space to enter to drop the item into its new position</li>
  </ol>
  <a11y-example-drag-and-drop-multi-list />
  <h2>Positioning elements in grids</h2>
  <p>
    In addition to being able to drag and drop to place elements along grid intersections, it can
    also be used by:
  </p>
  <ol class="ordered-list-bullet">
    <li>Tab / Shift-Tab into the grid and select an element</li>
    <li>Press Space to enter into drag mode</li>
    <li>Use the arrow keys to select a new position (hold Shift to move it faster!)</li>
    <li>Press Space to enter to drop the element into its new position</li>
  </ol>
  <a11y-example-drag-and-drop-grid />
</template>

<script setup lang="ts">
  import A11yExampleDragAndDropGrid from '../components/examples/A11yExampleDragAndDropGrid.vue';
  import A11yExampleDragAndDropList from '../components/examples/A11yExampleDragAndDropList.vue';
  import A11yExampleDragAndDropMultiList from '../components/examples/A11yExampleDragAndDropMultiList.vue';
</script>
