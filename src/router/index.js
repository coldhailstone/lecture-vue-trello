import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Board from '../components/Board.vue';
import Card from '../components/Card.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
    store.getters.isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home, beforeEnter: requireAuth },
        { path: '/login', component: Login },
        { path: '/b/:bid', component: Board, beforeEnter: requireAuth, children: [{ path: 'c/:cid', component: Card, beforeEnter: requireAuth }] },
        { path: '*', component: NotFound }
    ]
});

export default router;
