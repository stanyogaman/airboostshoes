const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

let products = [];

fs.createReadStream('./data/products.csv')
  .pipe(csv())
  .on('data', (row) => {
    products.push({
      name: row.Name,
      price: row.Price,
      image: row.Image,
    });
  })
  .on('end', () => {
    console.log('Каталог загружен!');
  });

app.get('/', (req, res) => {
  res.render('index', { products });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
