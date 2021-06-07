<template>
<div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Корзина
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <table class="table" v-if="cart.length >= 1">
              <thead>
                <tr>
                  <th scope="col">Товар</th>
                  <th scope="col">Цена</th>
                  <th scope="col">Количество</th>
                  <th scope="col">Сумма</th>
                  <th scope="col"></th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartSet" :key="item.id_product">
                  <td>{{ item.product_name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ count(item) }}</td>
                  <td>{{ resPrice(item) }}</td>
                  <td>

                  <button @click="addToCart(item)" class="btn btn-primary" style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>

                  <button @click="removeFromCart(item)" class="btn btn-primary" style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                  </button>

                  <button @click="removeAll(item)" class="btn btn-primary">
                    Удалить
                  </button>

                  </td>
                </tr>
              </tbody>
            <tfoot>
            <tr>
              <td>Итого</td>
              <td></td>
              <td>{{ countAll() }}</td>
              <td>{{ summary() }}</td>
            </tr>
            </tfoot>
        </table>

          <div v-else>Товары отсутствуют</div>

        </slot>
       </section>

      <footer class="modal-footer">
        <slot name="footer">

        </slot>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Закрыть
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Basket",
  props: {
    cart: Array,
    cartSet: Array,
    },
  methods: {
    close() {
      this.$emit('close');
    },
    removeFromCart(item) {
      this.$emit('remove-from-cart', item);
    },
    addToCart(item) {
      this.$emit('add-to-cart', item);
    },
    removeAll(item) {
      this.$emit('remove-all', item);
    },
    count(item) {
      return this.cart.filter(x => x.product_name===item.product_name).length;
    },
    countAll() {
      return this.cart.length;
    },
    resPrice(item) {
      return this.cart.filter(x => x.product_name===item.product_name).length * item.price;
    },
    summary() {
      return this.cart.reduce((acc, item) => {
          if (!item.price) return acc;
            return acc + item.price;
       }, 0);
    },
    },
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>