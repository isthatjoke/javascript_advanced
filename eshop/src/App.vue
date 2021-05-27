<template>

  <Basket
      v-show="isModalVisible"
      @close="closeModal"
    />

  <header>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">eShop</a>
                  <Search
                  @search="searchSubmit"
                  @emptysearch="emptySearch"
                  />
                <span class="navbar-text">
                    <button @click="showModal" class="btn btn-primary" type="button">Корзина</button>
                </span>
            </div>
        </nav>
  </header>
  <GoodsList v-bind:goods="filteredGoods" v-show="isGoodsVisible"/>
  <JsonError v-show="isErrorVisible"/>

</template>

<script>
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
import GoodsList from './components/GoodsList'
import Basket from './components/Basket'
import Search from './components/Search'
import JsonError from './components/JsonError'

export default {
  components: {
    GoodsList,
    Basket,
    Search,
    JsonError,
  },
  data: () => ({
    goods: [],
    filteredGoods: [],
    isModalVisible: false,
    isGoodsVisible: true,
    isErrorVisible: false,
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
        .catch((error) => {
          console.log(error);
          this.isGoodsVisible = false;
          this.isErrorVisible = true;
      })
    },
    searchSubmit(data) {
      if (data === '') {
        this.filteredGoods = this.goods;

      } else {
        console.log(this.filteredGoods);
        this.filteredGoods = this.filteredGoods.filter(item => item.product_name.toLowerCase() === data.toLowerCase());
        }
      },
    showModal() {
        this.isModalVisible = true;
      },
    closeModal() {
        this.isModalVisible = false;
      },
    emptySearch() {
      this.filteredGoods = this.goods;
    }
    },
}
</script>

<style>


</style>
