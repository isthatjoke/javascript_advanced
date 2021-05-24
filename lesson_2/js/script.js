class GoodsItem {
  constructor(title='clothes', price=0) {
    this.title = title;
    this.price = price;
  }
  render() {
    return  `<div class="col">
        <div class="card h-100">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-    label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect           width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">Price: ${this.price}</p>
        </div>
        </div>
        </div>`;
  }
}

class GoodsList {
    constructor() {
        this.goods = [];
  }
  fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
  }
  render() {
      let listHtml = '';
      this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
          listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
  }
  show_sum() {
      let sum = 0
      this.goods.forEach(good => {
         sum += parseInt(good.price);
      });
      const result = new GoodsItem('сумма всех позиций', sum);
      document.querySelector('.goods-sum').innerHTML = result.render();
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.show_sum();


class Bin {
    constructor() {
        this.items = [];
    }
    get_sum() {

    }
    get_items_count() {

    }

}