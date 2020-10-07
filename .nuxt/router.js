import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _104b39b2 = () => interopDefault(import('../pages/addClient/index.vue' /* webpackChunkName: "pages/addClient/index" */))
const _057dbbba = () => interopDefault(import('../pages/addKebab/index.vue' /* webpackChunkName: "pages/addKebab/index" */))
const _581b8263 = () => interopDefault(import('../pages/clients/index.vue' /* webpackChunkName: "pages/clients/index" */))
const _45cde885 = () => interopDefault(import('../pages/kebabs/index.vue' /* webpackChunkName: "pages/kebabs/index" */))
const _67467cea = () => interopDefault(import('../pages/clients/_id.vue' /* webpackChunkName: "pages/clients/_id" */))
const _681d3cac = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addClient",
    component: _104b39b2,
    name: "addClient"
  }, {
    path: "/addKebab",
    component: _057dbbba,
    name: "addKebab"
  }, {
    path: "/clients",
    component: _581b8263,
    name: "clients"
  }, {
    path: "/kebabs",
    component: _45cde885,
    name: "kebabs"
  }, {
    path: "/clients/:id",
    component: _67467cea,
    name: "clients-id"
  }, {
    path: "/",
    component: _681d3cac,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
