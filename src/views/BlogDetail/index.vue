<template>
  <div class="py-5">
    <router-link
      :to="{ name: 'EditBlog', params: { id: blogDetail.id } }"
      type="button"
      class="btn btn-success float-right"
      ><fai icon="fa-solid fa-pen" class="mr-2" />Edit</router-link
    >
    <h1 class="h1">{{ blogDetail.title }}</h1>
    <div class="text-center my-4">
      <img
        :src="blogDetail.thumbnail"
        width="300"
        height="300"
        class="blog-thumbnail"
        alt="thumbnail"
      />
    </div>
    <div v-html="blogDetail.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogDetail: {
        id: "",
        title: "",
        thumbnail: "",
        content: "",
      },
    };
  },
  async created() {
    await this.fetchBlog();
  },
  methods: {
    async fetchBlog() {
      this.$store.commit("ENABLE_LOADING");
      try {
        const response = await this.$store.dispatch(
          "fetchBlog",
          this.$route.params.id
        );
        this.blogDetail = response.data;
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("DISABLE_LOADING");
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-thumbnail {
  object-fit: cover;
}
</style>
