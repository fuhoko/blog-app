<template>
  <div class="py-5">
    <h1>Create blog</h1>
    <BlogForm :loading="loading" @submitForm="createBlog"></BlogForm>
  </div>
</template>

<script>
import BlogForm from "@/components/Blog/BlogForm"
import { uploadFile } from "@/utils/uploadFile.js";
export default {
  components: {
    BlogForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async createBlog({ formData, file }) {
      this.loading = true
      try {
        const responseUpload = await uploadFile(file, "thumbnail");
        formData.thumbnail = responseUpload.data.files[0].fileUrl;
        formData = { ...formData, createdAt: Date.now() / 1000, updatedAt: Date.now() / 1000 }
        await this.$store.dispatch("createBlog", formData);
        this.$router.push("/")
      } catch(e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>