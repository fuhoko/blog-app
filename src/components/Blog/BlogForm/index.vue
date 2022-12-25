<template>
  <form @submit.prevent>
    <div class="form-group">
      <label for="title-input">Title <span class="text-danger h5">*</span></label>
      <input
        v-model.trim="blogForm.title"
        class="form-control"
        id="title-input"
      />
    </div>
    <div class="form-group">
      <label for="thumbnail-input"
        >Thumbnail <span class="text-danger h5">*</span></label
      >
      <input
        type="file"
        class="form-control-file"
        id="thumbnail-input"
        accept="image/*"
        @change="changeFile"
      />
    </div>
    <div v-if="previewImg">
      <img :src="previewImg" width="150" height="150" alt="thumbnail" />
    </div>
    <div class="form-group">
      <label for="content-input"
        >Content <span class="text-danger h5">*</span></label
      >
      <quill-editor
        v-model.trim="blogForm.content"
        class="editor-form"
        :options="options"
      />
    </div>
    <button
      type="submit"
      :disabled="!blogForm.content || !blogForm.title || !previewImg || loading"
      class="btn btn-primary"
      @click="submitForm"
    >
      <IconLoading v-if="loading" />
      Submit
    </button>
  </form>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { quillEditor } from "vue-quill-editor";
import IconLoading from "@/components/shared/IconLoading/index.vue"
export default {
  components: {
    quillEditor,
    IconLoading
  },
  props: {
    blogData: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blogForm: {
        title: "",
        thumbnail: "",
        content: "",
      },
      fileUpload: null,
      options: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              ["formula"],
            ],
          },
        },
        placeholder: "",
        theme: "snow",
        readOnly: false,
      },
    };
  },
  computed: {
    previewImg() {
      if (this.fileUpload) {
        return URL.createObjectURL(this.fileUpload);
      }
      if (this.blogForm.thumbnail) {
        return this.blogForm.thumbnail;
      }
      return null;
    },
  },
  created() {
    if (this.blogData) {
      this.blogForm = { ...this.blogForm, ...this.blogData };
    }
  },
  methods: {
    submitForm() {
      this.$emit("submitForm", { formData: this.blogForm, file: this.fileUpload });
    },
    changeFile(e) {
      this.fileUpload = e.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ql-container {
  min-height: 10rem;
  max-height: 15rem;
  overflow: auto;
}
.blog-thumbnail {
  object-fit: cover;
}
</style>