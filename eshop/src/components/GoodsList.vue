<template>

  <main>
        <div class="container">
            <div class="row">
                <div class="col-1"></div>

                <div class="col-10">
                    <div v-if="goods.length >= 1" class="row row-cols-1 row-cols-md-3 g-4 goods-list">
                      <div v-for="item in goods" :key="item.id_product" class="col">
                        <div class="card h-100">
                          <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect           width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                          <div class="card-body">
                            <h5 class="card-title">{{item.product_name}}</h5>
                            <p class="card-text">Price: {{item.price}}</p>
                            <button @click="addToCart(item)" class="btn btn-primary">Добавить</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div v-else>
                    <h1>Товары отсутствуют</h1>
                  </div>
                </div>

                <div class="col-1"></div>
            </div>
        </div>
  </main>
</template>

<script>
export default {
  name: "GoodsList",
  props: {
    goods: Array,
    },
  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', item);
    }
  }
  }

</script>
<style scoped>
main {
  margin-top: 20px;
}

</style>