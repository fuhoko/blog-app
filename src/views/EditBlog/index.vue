<template>
  <div class="py-5">
    <h1>Edit blog</h1>
    <BlogForm
      v-if="blogData"
      :blogData="blogData"
      :loading="loading"
      @submitForm="editBlog"
    ></BlogForm>
  </div>
</template>

<script>
import BlogForm from "@/components/Blog/BlogForm";
import { uploadFile } from "@/utils/uploadFile.js";
export default {
  components: {
    BlogForm,
  },
  data() {
    return {
      blogData: null,
      loading: false,
    };
  },
  async created() {
    await this.fetchBlog();
  },
  methods: {
    async fetchBlog() {
      this.$store.commit('ENABLE_LOADING')
      try {
        const response = await this.$store.dispatch(
          "fetchBlog",
          this.$route.params.id
        );
        this.blogData = response.data;
      } catch (e) {
        console.log(e);
      }
      this.$store.commit('DISABLE_LOADING')
    },
    async editBlog({ formData, file }) {
      this.loading = true
      try {
        if (file) {
          const responseUpload = await uploadFile(file, "thumbnail");
          formData.thumbnail = responseUpload.data.files[0].fileUrl;
          formData = { ...formData, updatedAt: Date.now() / 1000  }
        }
        await this.$store.dispatch("editBlog", {
          id: this.$route.params.id,
          payload: formData,
        });
        this.$router.push({
          name: "BlogDetail",
          params: { id: this.$route.params.id },
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false
      }
    },
  },
};
</script>