<template>
  <a11y-example>
    <div
      class="background-color-white color-black p-2 br-5 flex flex-direction-row gap-3 flex-wrap-wrap justify-content-center mx-auto"
      style="max-width: 500px"
    >
      <section
        v-for="column in COLUMNS"
        :key="column"
        ref="columnRefs"
        class="a11y-example-drag-and-drop-multi-list-column border-full-grey-1 p-1 overflow-auto"
        :style="{ width: '150px', height: '300px' }"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop($event, column)"
      >
        <div class="text-align-center text-body-med">{{ column }}</div>
        <div
          v-for="item in items
            .filter(i => i.column === column)
            .sort((a, b) => a.text.localeCompare(b.text))"
          ref="itemRefs"
          :key="item.text"
          :data-item="item.text"
          class="cursor-move user-select-none background-color-hover-grey-1-o-15 p-1 border-full-grey-1 m-1 text-body-reg"
          :class="[selection?.text === item.text ? 'background-color-grey-1-o-15' : '']"
          :draggable="true"
          :tabindex="selection === undefined || selection?.text === item.text ? 0 : -1"
          :aria-selected="selection?.text === item.text"
          @dragstart="onDragStart($event, item)"
          @keydown="onKeyDown($event, item, column)"
        >
          ⋮ {{ item.text }}
        </div>
      </section>
    </div>
  </a11y-example>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';

  import { modularClamp, range } from '../../helpers/utility';
  import A11yExample from '../utility/A11yExample.vue';

  const COLUMNS = ['To Do', 'In Review', 'Done'] as const;
  type Column = (typeof COLUMNS)[number];
  type Item = { text: string; column: Column };

  const items = ref<Item[]>(
    range(10).map(i => ({ text: `Item #${i}`, column: COLUMNS[i % COLUMNS.length] as Column }))
  );
  const itemRefs = ref<HTMLDivElement[]>([]);
  const columnRefs = ref<HTMLDivElement[]>([]);
  const selection = ref<Item | undefined>(undefined);

  // https://learnvue.co/articles/vue-drag-and-drop
  // https://web.dev/articles/drag-and-drop

  const onDragStart = (e: DragEvent, item: Item): void => {
    columnRefs.value.forEach(columnRef => columnRef.classList.remove('drag-over'));

    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '0.4';

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item', item.text);
      }
    }
  };

  const onDragEnd = (e: DragEvent): void => {
    columnRefs.value.forEach(columnRef => columnRef.classList.remove('drag-over'));

    const { target } = e;
    if (target) {
      (target as HTMLElement).style.opacity = '1';
    }
  };

  const onDragOver = (e: DragEvent): boolean => {
    e.preventDefault();
    const columnElement = e
      .composedPath()
      .find(v =>
        (v as HTMLElement).classList.contains('a11y-example-drag-and-drop-multi-list-column')
      );
    if (columnElement) {
      (columnElement as HTMLElement).classList.add('drag-over');
    }
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

  const onDrop = (e: DragEvent, column: Column): boolean => {
    // Stop the browser from redirecting.
    e.stopPropagation();

    columnRefs.value.forEach(columnRef => columnRef.classList.remove('drag-over'));

    if (e.dataTransfer) {
      const droppedText = e.dataTransfer.getData('item');
      const droppedItem = items.value.find(i => i.text === droppedText);
      if (droppedItem) {
        droppedItem.column = column;
      }
    }

    return false;
  };

  const shiftSelection = (column: Column, left: boolean): void => {
    const columnIndex = COLUMNS.findIndex(c => c === column);

    if (selection.value && columnIndex >= 0) {
      const toColumnIndex = modularClamp(columnIndex + (left ? -1 : 1), 0, COLUMNS.length);
      selection.value.column = COLUMNS[toColumnIndex] as Column;
    }
  };

  const onKeyDown = async (e: KeyboardEvent, item: Item, column: Column): Promise<void> => {
    if (e.key === ' ') {
      e.preventDefault();
      selection.value = selection.value ? undefined : item;
    } else if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      if (!selection.value) {
        return;
      }

      e.preventDefault();
      shiftSelection(column, e.key === 'ArrowLeft');
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
</script>

<style lang="scss" scoped></style>
