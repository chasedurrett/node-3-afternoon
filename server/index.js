require("dotenv").config();
const massive = require("massive");
const express = require("express");
const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const port = SERVER_PORT;
const ctrl = require('./products_controller')

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    app.set("db", dbInstance);
  })


app.use(express.json());

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.get('/api/products/:id', ctrl.update)
app.get('/api/products', ctrl.create)
app.get('/api/products/:id', ctrl.delete)


app.listen(port, () => console.log(`server activated port ${port}`));