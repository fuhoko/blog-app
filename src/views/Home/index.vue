<template>
  <div class="py-5">
    <div class="mb-4 sort-by-input">
      <select
        :value="blogState.queryParams.order"
        class="custom-select"
        @change="changeSortOrder"
      >
        <option value="desc">Sort by Newest</option>
        <option value="asc">Sort by Oldest</option>
      </select>
    </div>
    <article
      v-for="blog in blogState.blogList"
      :key="blog.id"
      class="media blog"
      @click="$router.push({ name: 'BlogDetail', params: { id: blog.id } })"
    >
      <img
        :src="blog.thumbnail"
        width="150"
        height="150"
        class="mr-3 blog-thumbnail"
        alt="thumbnail"
      />
      <div class="media-body">
        <h5 class="mt-0">{{ blog.title }}</h5>
      </div>
    </article>
    <Pagination
      :totalItems="blogState.totalBlogs"
      :curPage="blogState.queryParams.page"
      :limit="blogState.queryParams.limit"
      class="mt-5 float-right"
      @changePage="changePage"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/shared/Pagination/index.vue";
import { mapState } from "vuex";
export default {
  components: {
    Pagination,
  },
  computed: {
    ...mapState({
      blogState: (state) => state.blog,
    }),
  },
  created() {
    this.$store.dispatch("fetchBlogs");
  },
  methods: {
    setQueryParams() {
      const { page, title, order } = this.$route.query;
      title && this.$store.commit("SET_QUERY_PARAMS", { title });
      order && this.$store.commit("SET_QUERY_PARAMS", { order });
      (page &&
        !isNaN(page) &&
        page > 0 &&
        this.$store.commit("SET_QUERY_PARAMS", { page: +page })) ||
        this.$store.commit("SET_QUERY_PARAMS", { page: 1 });
    },
    changePage(newPage) {
      this.$store.commit("SET_QUERY_PARAMS", { page: newPage });
      this.$store.dispatch("fetchBlogs");
      const { page, title, order } = this.blogState.queryParams;
      let queryParams = { page };
      title && (queryParams = { ...queryParams, title });
      order && (queryParams = { ...queryParams, order });
      return this.$router.push({
        name: "Home",
        query: queryParams,
      });
    },
    changeSortOrder(e) {
      const order = e.target.value;
      this.$store.commit("SET_QUERY_PARAMS", { order });
      this.$store.dispatch("fetchBlogs");
      const { page, title } = this.blogState.queryParams;
      let queryParams = { page, order };
      title && (queryParams = { ...queryParams, title });
      return this.$router.push({
        name: "Home",
        query: queryParams,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  &:hover {
    text-decoration: underline;
    background-color: aliceblue;
  }
  & + & {
    margin-top: 1.5rem;
  }
}
.blog-thumbnail {
  object-fit: cover;
}
.sort-by-input {
  width: 220px;
  margin-left: auto;
}
</style>
