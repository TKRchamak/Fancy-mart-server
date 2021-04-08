const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser =require('body-parser')
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()
const port = process.env.PORT || 5055


app.use(cors())
app.use(bodyParser.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttm7i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("assignment_10").collection("items");
  

  app.post('/addProduct', (req, res)=> {
    const productData = req.body;
    console.log(productData)
    productCollection.insertOne(productData)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/products', (req,res)=> {
    productCollection.find()
    .toArray((error, document) => {
      res.send(document);
    })
  })

  // client.close();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)