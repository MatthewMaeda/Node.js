
import express from 'express';

const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});

const items = [
  {
  id: 1,
  product: "Item 1",
  price: 1.99,
  quantity: 100
},
{
  id: 2,
  product: "Item 2",
  price: 2.99,
  quantity: 200
},
{
  id: 3,
  product: "Item 3",
  price: 3.99,
  quantity: 300
},
{
  id: 4,
  product: "Item 4",
  price: 4.99,
  quantity: 400
}
];

// gets array
app.get('/cart-items', (req, res) => {
    res.send(items);
    res.status(200).send("OK");
  });

// gets ID
app.get('/cart-items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) res.status(404).send("ID Not Found");
    res.send(item);
    res.status(200).send("OK");
});

// adds item to array
app.post('/cart-items/', (req, res) => {
    if (!req.body.product || req.body.id.length < 4) {
      res.status(300).send("Product name is required and should be more than Item 4");
      return;
    }
    const item = req.body;
    items.push(item);
    res.send(item);
    res.status(201).send("Created");
  });

  //updates array
  app.put('/cart-items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    const newItem = req.body;
    if (!item) return res.status(404).send("The item was not found");
    const index = items.indexOf(item);
    items.splice(index, 1, newItem);
    res.send(newItem);
    res.status(200).send("OK");
  });

  //delete 
  app.delete('/cart-items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("The item was not found");
    const index = items.indexOf(item);
    items.splice(index, 1);
    res.send(item);
    res.status(204).send("No Content");
  });