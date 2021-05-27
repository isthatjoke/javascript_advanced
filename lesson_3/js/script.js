
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

// function makeGETRequest(url, callback) {
//   var xhr;
//
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) {
//     xhr = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       callback(xhr.responseText);
//     }
//   }
//
//   xhr.open('GET', url, true);
//   xhr.send();
// }

class GoodsItem {
  constructor(product_name='clothes', price=0) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return  `<div class="col">
        <div class="card h-100">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-    label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect           width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div class="card-body">
        <h5 class="card-title">${this.product_name}</h5>
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
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods);
            })
            .then(() => {
                this.render();
            })
            .then(() => {
                this.show_sum();
            })
            .catch(() => console.log('произошла ошибка'))
  }
  render() {
      let listHtml = '';
      this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.product_name, good.price);
          listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
  }
  // show_sum() {
  //     let sum = 0
  //     this.goods.forEach(good => {
  //        sum += parseInt(good.price);
  //     });
  //     const result = new GoodsItem('сумма всех позиций', sum);
  //     document.querySelector('.goods-sum').innerHTML = result.render();
  // }
  show_sum() {
      const totalSum = this.goods.reduce((acc, item) => {
          if (!item.price) return acc;
            return acc + item.price;
       }, 0);
      const result = new GoodsItem('сумма всех позиций', totalSum);
      document.querySelector('.goods-sum').innerHTML = result.render();
  }
}

const list = new GoodsList();
list.fetchGoods();

// list.fetchGoods(() => {
//     list.render(() => {
//         list.show_sum()
//     });
// });

class Basket extends GoodsList {
  constructor(...args) {
    super(...args);
  }

  clearAll() {
      this.goods.clearAll();
  }

  addItem(item) {
      this.goods.addItem(item);
  }

  removeItem(item) {
      this.goods.removeItem(item);
  }

  showItems() {
      let listHtml = '';
      this.goods.forEach(good => {
          const goodItem = new BasketItem(good.product_name, good.price);
          listHtml += goodItem.render();
      });
      document.querySelector('.basket-list').innerHTML = listHtml;
  }
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() {
      this.count += 1;
  }

  removeOne() {
      if (this.count > 0) {
          this.count -= 1;
      }
  }

  render() {
    return  `<div class="col">
        <div class="card h-100">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-    label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect           width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div class="card-body">
        <h5 class="card-title">${this.product_name}</h5>
        <p class="card-text">Price: ${this.price}</p>
        <p class="card-text">Count: ${this.count}</p>
        <p class="card-text">Summary: ${this.price * this.count}</p>
        </div>
        </div>
        </div>`;
  }
}
