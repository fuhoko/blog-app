export default {
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    ENABLE_LOADING(state) {
      state.isLoading = true;
    },
    DISABLE_LOADING(state) {
      state.isLoading = false;
    },
  },
};
