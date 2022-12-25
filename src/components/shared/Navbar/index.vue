<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item"
            :class="{ active: $route.path === '/' }"
            @click="fetchBlogs"
          >
            <span class="nav-link">
              <fai icon="fa-solid fa-house" class="mr-1" />Home
            </span>
          </li>
          <router-link
            to="/create-blog"
            active-class="active"
            class="nav-item text-decoration-none"
          >
            <span class="nav-link">
              <fai icon="fa-solid fa-plus" class="mr-1" />New blog
            </span>
          </router-link>
        </ul>

        <form class="form-inline" @submit.prevent>
          <div class="form-group my-2 my-md-0">
            <input
              v-model="filterValue"
              class="form-control"
              placeholder="Search..."
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary ml-2"
            @click="searchBlog"
          >
            <fai icon="fa-solid fa-magnifying-glass" class="mr-1" />
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      filterValue: "",
    };
  },
  created() {
    this.filterValue = this.$route.query.title;
  },
  methods: {
    fetchBlogs() {
      this.$store.commit("RESET_QUERY_PARAMS");
      if (this.$route.name === "Home") {
        this.$store.dispatch("fetchBlogs");
      }
      this.$router.push("/");
    },
    searchBlog() {
      this.$store.commit("RESET_QUERY_PARAMS");
      const queryParams = { title: this.filterValue };
      this.$store.commit("SET_QUERY_PARAMS", queryParams);
      this.$store.dispatch("fetchBlogs");
      this.$router.push({
        name: "Home",
        query: queryParams,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  & + & {
    @media only screen and (min-width: 768px)  {
      margin-left: 1rem;
    }
  }
}
</style>