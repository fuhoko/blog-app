import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/components/layouts/Default/index.vue"
import HomePage from "@/views/Home/index.vue"
import CreateBlog from "@/views/CreateBlog/index.vue"
import BlogDetail from "@/views/BlogDetail/index.vue"
import EditBlog from "@/views/EditBlog/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    component: DefaultLayout,
    children: [
      {
        name: "Home",
        path: "",
        component: HomePage
      },
      {
        name: "CreateBlog",
        path: "/create-blog",
        component: CreateBlog
      },
      {
        name: "BlogDetail",
        path: "/blog/:id",
        component: BlogDetail
      },
      {
        name: "EditBlog",
        path: "/edit-blog/:id",
        component: EditBlog
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
