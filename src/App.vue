<template>
  <div class="a11y-app">
    <nav
      class="a11y-app-nav px-3 flex flex-direction-row align-items-center gap-2 overflow-auto border-bottom-white"
    >
      <router-link
        v-for="name in NAVIGABLE_ROUTES"
        :key="name"
        :to="{ name }"
        class="br-10 py-1 px-2 background-color-white background-color-hover-white-o-75 color-grey-1 text-decoration-none flex-shrink-0"
        background-colour="white"
        colour="grey-1"
      >
        {{ name }}
      </router-link>
    </nav>
    <article class="a11y-app-article px-3 py-2">
      <h1>{{ route.name }}</h1>
      <router-view />
    </article>
    <footer
      class="a11y-app-footer ml-auto my-auto width-100 border-top-white display-flex height-100 align-items-center"
    >
      <a :href="homepage" class="text-decoration-underline color-white ml-auto">
        Hosted with ❤ by Github
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import { homepage } from '../package.json';

  import { ROUTE_NAME } from './helpers/const';

  const LOCAL_STORAGE_SELECTED_ROUTE_KEY = 'route';
  const NAVIGABLE_ROUTES = Object.values(ROUTE_NAME).filter(
    r => !([ROUTE_NAME.DEFAULT] as string[]).includes(r)
  );
  type Route = Exclude<(typeof NAVIGABLE_ROUTES)[number], 'default'>;

  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    const previousRouteName = localStorage.getItem(LOCAL_STORAGE_SELECTED_ROUTE_KEY) || '';
    const name = NAVIGABLE_ROUTES.includes(previousRouteName as Route)
      ? (previousRouteName as Route)
      : ROUTE_NAME.ARIA_LIVE;
    void router.push({ name });
  });

  watch(route, () => {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_ROUTE_KEY, route.name?.toString() || '');
  });
</script>

<style lang="scss" scoped>
  .a11y-app {
    display: grid;
    grid-template-columns: 1fr minmax(300px, 90%) 1fr;
    grid-template-rows: 75px 1fr 75px;

    &-nav {
      grid-row: 1;
      grid-column: 2;
    }

    &-article {
      grid-row: 2;
      grid-column: 2;
    }

    &-footer {
      grid-row: 3;
      grid-column: 2;
    }
  }
</style>
