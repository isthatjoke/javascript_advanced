<template>

  <Basket
      v-show="isModalVisible"
      @close="closeModal"
      v-bind:cart="cart"
      v-bind:cartSet="cartSet"
      @remove-from-cart="removeFromCart"
      @add-to-cart="addToCart"
      @remove-all="removeAll"
  />

  <header>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="http://127.0.0.1:8080">eShop</a>
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
  <GoodsList @add-to-cart="addToCart" v-bind:goods="filteredGoods" v-show="isGoodsVisible"/>
  <JsonError v-show="isErrorVisible"/>

</template>

<script>
// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const API_URL = 'http://localhost:3000/api';

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
    cart: [],
    cartSet: [],
    map: [],
    isModalVisible: false,
    isGoodsVisible: true,
    isErrorVisible: false,
    }),
  mounted() {
    // this.makeGETRequest(`${API_URL}/catalogData.json`);
    this.getGoodsList();
    this.getCartList();

  },
  methods: {
    makeGETRequest(url) {
      return fetch(url)
        .then((data) => data.json())
    },
    makePOSTRequest(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data)
      })
        .then((data) => data.json())
    },
    getGoodsList() {
      this.makeGETRequest(`${API_URL}/goodslist`)
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
    getCartList() {
      this.makeGETRequest(`${API_URL}/cartlist`)
        .then((data) => {
          this.cart = data;
          this.map = new Map();
          this.cartSet = [];
          for (const item of this.cart) {
            if(!this.map.has(item.product_name)){
              this.map.set(item.product_name, true);
              this.cartSet.push({
                product_name: item.product_name,
                price: item.price
        });
    }
}
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addToCart(item) {
      this.makePOSTRequest(`${API_URL}/add`, item)
        .then(() => {
          this.getCartList();
        })
    },
    removeFromCart(item) {
      this.makePOSTRequest(`${API_URL}/remove`, item)
        .then(() => {
          this.getCartList();
        })
    },
    removeAll(item) {
      this.makePOSTRequest(`${API_URL}/delete`, item)
        .then(() => {
          this.getCartList();
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
