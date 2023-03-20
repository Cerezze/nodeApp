const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://cboz:luther66@cluster0.d0gwoea.mongodb.net";
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);