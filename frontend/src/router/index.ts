import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinUs from "@/components/JoinUs.vue";
import MyPageIndex from "@/views/mypage/MyPageIndex.vue";
import MyPageInfo from "@/views/mypage/MyPageInfo.vue";
import MyPageWishlist from "@/views/mypage/MyPageWishlist.vue";
import MyPageMyboard from "@/views/mypage/MyPageMyboard.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardListView from "@/views/board/BoardListView.vue";
import SearchView from "@/views/SearchView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/joinUs',
    name: 'joinUs',
    component: JoinUs
  },
  {
    path: '/info',
    name: 'info',
    component: MyPageInfo,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: MyPageWishlist,
  },
  {
    path: '/myboard',
    name: 'myboard',
    component: MyPageMyboard,
  },
  {
    path: '/boardWrite',
    name: 'boardWrite',
    component: BoardWrite,
  },
  {
    path:'/boardList',
    name: 'boardList',
    component: BoardListView,
  },
  {
    path:'/searchView',
    name: 'searchView',
    component: SearchView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
