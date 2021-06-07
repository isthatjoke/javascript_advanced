const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));
app.use(cors());

app.get('/api/goodslist', (req, res) => {
    // res.send({response: 'good!'});
    fs.readFile('./database/goods.json', 'utf8', (err, data) => {
        if(!err) {
            res.set('Access-Control-Allow-Origin', '*');
            res.send(data);
        } else {
            res.set('Access-Control-Allow-Origin', '*');
            res.send({response: 'server error'});
        }
    })
});

app.get('/api/cartlist', (req, res) => {
    // res.send({response: 'good!'});
    res.set('Access-Control-Allow-Origin', '*');
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        if(!err) {

            res.send(data);
        } else {

            res.send({response: 'server error'});
        }
    })
});

app.post('/api/add', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    })
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        if(err) {

            res.send({"error": "bad request"});
        } else {

            const cart = JSON.parse(data);
            const item = req.body;
            cart.push(item);

            fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
                if(!err) {

                    res.send({"result": 1});
                } else {

                    res.send({"result": 0});
                }
            })
        }
    })
})

app.post('/api/remove', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    })
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        if(err) {

            res.send({"error": "bad request"});
        } else {

            const cart = JSON.parse(data);
            const item = req.body;

            let index = cart.findIndex(x => x.product_name === item.product_name);
            this.cart = cart.splice(index, 1)

            fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
                if(!err) {

                    res.send({"result": 1});
                } else {

                    res.send({"result": 0});
                }
            })
        }
    })
})

app.post('/api/delete', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    })
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        if(err) {

            res.send({"error": "bad request"});
        } else {

            const cart = JSON.parse(data);
            const old_item = req.body;
            const new_cart = []
            cart.forEach(item => {
                if(!(item.product_name === old_item.product_name)) {
                    new_cart.push(item);
                }
            })


            fs.writeFile('./database/cart.json', JSON.stringify(new_cart), (err) => {
                if(!err) {

                    res.send({"result": 1});
                } else {

                    res.send({"result": 0});
                }
            })
        }
    })
})

app.listen(3000, () => {
    console.log('server started at 3000');
})




