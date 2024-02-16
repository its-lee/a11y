<template>
  <a11y-example>
    <div
      class="background-color-white color-black p-2 br-5 gap-3 overflow-auto mx-auto max-width-max-content"
    >
      <div
        ref="gridRef"
        class="a11y-example-drag-and-drop-grid mx-auto position-relative"
        :style="{ width: `${GRID_WIDTH}px`, height: `${GRID_HEIGHT}px` }"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop($event)"
      >
        <div
          class="a11y-example-drag-and-drop-grid-backdrop position-absolute width-100 height-100"
        />
        <div
          v-for="item in items"
          ref="itemRefs"
          :key="item.text"
          :data-item="item.text"
          class="cursor-move user-select-none background-color-white background-color-hover-grey-3 p-1 border-full-grey-1 position-absolute"
          :class="[selection?.text === item.text ? 'background-color-grey-3 z-100' : '']"
          :style="{
            width: '120px',
            height: '40px'
          }"
          :draggable="true"
          :tabindex="selection === undefined || selection?.text === item.text ? 0 : -1"
          :aria-selected="selection?.text === item.text"
          @dragstart="onDragStart($event, item)"
          @keydown="onKeyDown($event, item)"
        >
          ⋮
          {{ item.text }}
        </div>
      </div>
    </div>
  </a11y-example>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref } from 'vue';

  import { clamp, range } from '../../helpers/utility';
  import A11yExample from '../utility/A11yExample.vue';

  const GRID_GAP = 10;
  const GRID_WIDTH = 400;
  const GRID_HEIGHT = 300;

  type Item = { text: string };

  const items = ref<Item[]>(range(3).map(i => ({ text: `Item #${i}` })));
  const gridRef = ref<HTMLDivElement | null>(null);
  const itemRefs = ref<HTMLDivElement[]>([]);
  const selection = ref<Item | undefined>(undefined);
  const nextItemZIndex = ref<number>(2);

  const onDragStart = (e: DragEvent, item: Item): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '0.4';

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item', item.text);

        // We'll need to correct later as we'll only be told where the mouse lets go of the drop,
        // not where the top left of the element is. These corrections let us determine what that
        // is.
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        e.dataTransfer.setData('leftCorrection', (e.clientX - rect.left).toString());
        e.dataTransfer.setData('topCorrection', (e.clientY - rect.top).toString());
      }
    }
  };

  const onDragEnd = (e: DragEvent): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '1';
    }
  };

  const onDragOver = (e: DragEvent): boolean => {
    e.preventDefault();
    return false;
  };

  const onDragEnter = (e: DragEvent): void => {
    e.preventDefault();
  };

  const onDragLeave = (e: DragEvent): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).classList.remove('drag-over');
    }
  };

  const snap = (value: number, element: HTMLElement, isHorizontal: boolean): number => {
    const max = isHorizontal
      ? GRID_WIDTH - element.clientWidth
      : GRID_HEIGHT - element.clientHeight;

    const exact = clamp(value, 0, max);
    return Math.floor(exact / GRID_GAP) * GRID_GAP;
  };

  const moveItem = (element: HTMLElement, left: number, top: number): void => {
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    // Every time we move an item, increase its z-index so that it's always on top of every other
    // item.
    element.style.zIndex = nextItemZIndex.value.toString();
    nextItemZIndex.value++;
  };

  const onDrop = (e: DragEvent): boolean => {
    // Stop the browser from redirecting.
    e.stopPropagation();

    if (e.dataTransfer) {
      const droppedText = e.dataTransfer.getData('item');
      const itemRef = itemRefs.value.find(i => i.dataset.item === droppedText);
      if (itemRef && gridRef.value) {
        const leftCorrection = Number.parseFloat(e.dataTransfer.getData('leftCorrection'));
        const topCorrection = Number.parseFloat(e.dataTransfer.getData('topCorrection'));

        const rect = gridRef.value.getBoundingClientRect();

        const left = snap(e.clientX - rect.left - leftCorrection, itemRef, true);
        const top = snap(e.clientY - rect.top - topCorrection, itemRef, false);

        moveItem(itemRef, left, top);
      }
    }

    return false;
  };

  const onKeyDown = async (e: KeyboardEvent, item: Item): Promise<void> => {
    if (e.key === ' ') {
      e.preventDefault();
      selection.value = selection.value ? undefined : item;
    } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      if (!selection.value) {
        return;
      }

      e.preventDefault();

      const itemRef = itemRefs.value.find(i => i.dataset.item === item.text);
      const magnitude = e.shiftKey ? 50 : 10;
      if (itemRef) {
        const left = snap(
          itemRef.offsetLeft +
            (e.key === 'ArrowLeft' ? -magnitude : e.key === 'ArrowRight' ? magnitude : 0),
          itemRef,
          true
        );
        const top = snap(
          itemRef.offsetTop +
            (e.key === 'ArrowUp' ? -magnitude : e.key === 'ArrowDown' ? magnitude : 0),
          itemRef,
          false
        );

        moveItem(itemRef, left, top);
      }
    }

    // We need to wait until the tabindex has been applied and when the template refs have been
    // updated to correctly focus here.
    await nextTick();

    // If the user has cursor'd down, we don't need to do this as the content has moved lower in the
    // source code so the tabindex will be enough for the item to remain selected. However if it is
    // moved up in the source code, we will have moved past the item in the source code so we'll
    // need to focus it to retain focus and allow us to continue moving it with cursor keys.
    const selectionRef = itemRefs.value.find(i => i.dataset.item === selection.value?.text);
    if (selectionRef) {
      selectionRef.focus({ preventScroll: true });
    }
  };

  onMounted(() => {
    // Initially, prevent all items from overlapping so that the user can see what they have to work
    // with.
    itemRefs.value.forEach((itemRef, index) => {
      itemRef.style.left = '20px';
      itemRef.style.top = `${20 + index * 50}px`;
      itemRef.style.zIndex = '1';
    });
  });
</script>

<style lang="scss" scoped>
  .a11y-example-drag-and-drop-grid {
    &-backdrop {
      // Adapted from https://stackoverflow.com/a/32861765
      $line-colour: map-get($colours, 'grey-3');
      $gap: calc(v-bind(GRID_GAP) * 1px);
      border-right: 1px solid $line-colour;
      border-bottom: 1px solid $line-colour;
      background-repeat: repeat;
      background-size: $gap $gap;
      background-image: linear-gradient(to right, $line-colour 1px, transparent 1px),
        linear-gradient(to bottom, $line-colour 1px, transparent 1px);
    }
  }
</style>
