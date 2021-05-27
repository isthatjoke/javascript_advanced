<template>
  <form class="d-flex">
    <input v-model="searchLine" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button @click="search" class="btn btn-outline-success" type="submit">Поиск</button>
  </form>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    searchLine: '',
  }),
  methods: {
    search() {
      this.$emit('search', this.searchLine);
    }
  },
  watch: {
    searchLine() {
      if (this.searchLine === '') {
        this.$emit('emptysearch')
      }
    }
  }
}
</script>

<style scoped>

</style>