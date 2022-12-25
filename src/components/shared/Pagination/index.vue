<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="curPage > 1" class="page-item disable" @click="changePage(curPage - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pageList"
        :key="page"
        class="page-item"
        :class="{ active: curPage == page }"
        @click="changePage(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li v-if="curPage < pageList" class="page-item" @click="changePage(curPage + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    curPage: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageList() {
      return Math.ceil(this.totalItems / this.limit);
    },
  },
  methods: {
    changePage(selectedPage) {
      this.$emit("changePage", selectedPage);
    },
  },
};
</script>