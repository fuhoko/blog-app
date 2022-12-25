export default {
  state() {
    return {
      queryParams: {
        limit: 10,
        page: 1,
        title: "",
        sortBy: "updatedAt",
        order: "desc",
      },
      totalBlogs: 0,
      blogList: [],
    };
  },
  mutations: {
    SET_QUERY_PARAMS(state, payload) {
      state.queryParams = { ...state.queryParams, ...payload };
    },
    SET_TOTAL_BLOGS(state, payload) {
      state.totalBlogs = payload;
    },
    SET_BLOG_LIST(state, payload) {
      state.blogList = payload;
    },
    RESET_QUERY_PARAMS(state) {
      state.queryParams = {
        ...state.queryParams,
        ...{ page: 1, title: "", order: "desc" }
      };
    },
  },
  actions: {
    async fetchBlogs({ commit, state }) {
      commit("ENABLE_LOADING");
      try {
        const response = await this._vm.axios.get("/blog", {
          params: state.queryParams
        });
        commit("SET_BLOG_LIST", response.data.items);
        commit("SET_TOTAL_BLOGS", response.data.total);
      } catch (e) {
        console.log(e);
      }
      commit("DISABLE_LOADING");
    },
    async fetchBlog(context, blogId) {
      return this._vm.axios.get(`/blog/${blogId}`);
    },
    async createBlog(context, payload) {
      return this._vm.axios.post("/blog", payload);
    },
    async editBlog(context, { id, payload }) {
      return this._vm.axios.put(`/blog/${id}`, payload);
    },
  },
};
