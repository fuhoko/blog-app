<template>
  <fai icon="fa-solid fa-circle-notch" class="icon-loading" :style="styles" />
</template>

<script>
export default {
  props: {
    styles: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-loading {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>