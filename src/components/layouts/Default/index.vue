<template>
  <div>
    <Loading
      :active.sync="$store.state.loading.isLoading"
      :is-full-page="true"
    ></Loading>
    <Navbar></Navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Navbar from "@/components/shared/Navbar/index.vue"
export default {
  components: {
    Navbar,
    Loading
  }
}
</script>
