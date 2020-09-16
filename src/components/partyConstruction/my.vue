<template>
  <div class="my">
    <my-nav></my-nav>
  </div>
</template>
<script>
import myNav from '@/components/page/nav'
export default {
  data() {
    return {}
  },
  components: {
    myNav,
  },
  mounted() {
    document.title = '党员中心'
  },
}
</script>
<style lang="scss" scoped></style>
