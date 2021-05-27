<template>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    />

  <header>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">eShop</a>
                  <form class="d-flex">
                    <input v-model="searchLine" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button @click="searchSubmit" class="btn btn-outline-success" type="submit">Поиск</button>
                  </form>
                <span class="navbar-text">
                    <button @click="showModal" class="btn btn-primary" type="button">Корзина</button>
                </span>
            </div>
        </nav>
  </header>

  <main>
        <div class="container">
            <div class="row">
                <div class="col-1"></div>

                <div class="col-10">
                    <div v-if="filteredGoods.length >= 1" class="row row-cols-1 row-cols-md-3 g-4 goods-list">
                      <div v-for="item in filteredGoods" :key="item.id_product" class="col">
                        <div class="card h-100">
                          <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-    label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect           width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                          <div class="card-body">
                            <h5 class="card-title">{{item.product_name}}</h5>
                            <p class="card-text">Price: {{item.price}}</p>
                            <a href="#" class="btn btn-primary">Добавить</a>
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
import Modal from "./Modal.vue";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
export default {
  data: () => ({
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isModalVisible: false,
    }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`);
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    searchSubmit() {
      if (this.searchLine === '') {
        this.filteredGoods = this.goods;

      } else {
        console.log(this.filteredGoods);
        this.filteredGoods = this.filteredGoods.filter(item => item.product_name.toLowerCase() === this.searchLine.toLowerCase());
        }
      },
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
  watch: {
    searchLine() {
      if (this.searchLine === '') {
        this.filteredGoods = this.goods;
      }
    }
  },
  components: {
    Modal,
  },

}
</script>

<style scoped>
main {
  margin-top: 20px;
}

</style>