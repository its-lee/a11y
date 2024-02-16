<template>
  <a11y-example>
    <div class="background-color-white br-5">
      <div
        v-for="item in items"
        ref="itemRefs"
        :key="item"
        :data-item="item"
        class="cursor-move user-select-none color-black background-color-hover-grey-1-o-15 p-1"
        :class="[selection === item ? 'background-color-grey-1-o-15' : '']"
        :draggable="true"
        :tabindex="selection === undefined || selection === item ? 0 : -1"
        :aria-selected="selection === item"
        @dragstart="onDragStart($event, item)"
        @dragend="onDragEnd"
        @drop="onDrop($event, item)"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @keydown="onKeyDown($event, item)"
      >
        ⋮ {{ item }}
      </div>
    </div>
  </a11y-example>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';

  import { modularClamp, range } from '../../helpers/utility';
  import A11yExample from '../utility/A11yExample.vue';

  const items = ref<string[]>(range(10).map(i => `Item #${i}`));
  const itemRefs = ref<HTMLDivElement[]>([]);
  const selection = ref<string | undefined>(undefined);

  // https://learnvue.co/articles/vue-drag-and-drop
  // https://web.dev/articles/drag-and-drop

  const onDragStart = (e: DragEvent, item: string): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '0.4';

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item', item);
      }
    }
  };

  const onDragEnd = (e: DragEvent): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '1';
    }

    itemRefs.value.forEach(itemRef => itemRef.classList.remove('drag-over'));
  };

  const onDragOver = (e: DragEvent): boolean => {
    e.preventDefault();
    return false;
  };

  const onDragEnter = (e: DragEvent): void => {
    e.preventDefault();
    const { target } = e;
    if (target) {
      (target as HTMLElement).classList.add('drag-over');
    }
  };

  const onDragLeave = (e: DragEvent): void => {
    const { target } = e;
    if (target) {
      (target as HTMLElement).classList.remove('drag-over');
    }
  };

  const onDrop = (e: DragEvent, item: string): boolean => {
    // Stop the browser from redirecting.
    e.stopPropagation();

    if (e.dataTransfer) {
      const droppedItem = e.dataTransfer.getData('item');
      moveItem(
        droppedItem,
        items.value.findIndex(i => i === item)
      );
    }

    return false;
  };

  const moveItem = (fromValue: string, toIndex: number): void => {
    const fromIndex = items.value.findIndex(i => i === fromValue);
    if (fromIndex >= 0 && toIndex >= 0) {
      // Remove the item from where it was..
      items.value.splice(fromIndex, 1);
      // ..and put it where it now needs to be.
      items.value.splice(toIndex, 0, fromValue);
    }
  };

  const onKeyDown = async (e: KeyboardEvent, item: string): Promise<void> => {
    if (selection.value) {
      e.preventDefault();
    }

    if (e.key === ' ') {
      e.preventDefault();
      selection.value = selection.value ? undefined : item;
    } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      if (selection.value) {
        e.preventDefault();
      }

      const down = e.key === 'ArrowDown';
      const selectionIndex = items.value.findIndex(i => i === selection.value);
      const toIndex = modularClamp(selectionIndex + (down ? 1 : -1), 0, items.value.length);

      moveItem(selection.value || '', toIndex);
    }

    // We need to wait until the tabindex has been applied and when the template refs have been
    // updated to correctly focus here.
    await nextTick();

    // If the user has cursor'd down, we don't need to do this as the content has moved lower in the
    // source code so the tabindex will be enough for the item to remain selected. However if it is
    // moved up in the source code, we will have moved past the item in the source code so we'll
    // need to focus it to retain focus and allow us to continue moving it with cursor keys.
    const selectionRef = itemRefs.value.find(i => i.dataset.item === selection.value);
    if (selectionRef) {
      selectionRef.focus({ preventScroll: true });
    }
  };
</script>

<style lang="scss" scoped></style>
