import type { Component } from 'vue';
import type { Router, RouteRecordName, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import { ROUTE_NAME } from '../helpers/const';

// Force people to name their routes
export type CustomRouteRecordRaw = RouteRecordRaw & { name: RouteRecordName };

export const routes: CustomRouteRecordRaw[] = [
  // Default route (you'll be redirected to login if you're not already there)
  {
    path: '/',
    name: ROUTE_NAME.DEFAULT,
    redirect: { name: ROUTE_NAME.ARIA_LIVE }
  },
  {
    path: '/aria-live',
    name: ROUTE_NAME.ARIA_LIVE,
    component: (): Promise<Component> => import('../views/A11yAriaLive.vue')
  },
  {
    path: '/aria-atomic',
    name: ROUTE_NAME.ARIA_ATOMIC,
    component: (): Promise<Component> => import('../views/A11yAriaAtomic.vue')
  },
  {
    path: '/aria-relevant',
    name: ROUTE_NAME.ARIA_RELEVANT,
    component: (): Promise<Component> => import('../views/A11yAriaRelevant.vue')
  },
  {
    path: '/drag-and-drop',
    name: ROUTE_NAME.DRAG_AND_DROP,
    component: (): Promise<Component> => import('../views/A11yDragAndDrop.vue')
  }
];

const router = createRouter({ history: createWebHashHistory(), routes });

router.beforeEach(to => {
  if (document) {
    document.title = `a11y | ${to.name?.toString()}`;
  }
});

export const useRouter = (): Router => router;
