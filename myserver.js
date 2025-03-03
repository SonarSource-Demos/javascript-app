const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  console.log("Hello called");
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
 console.log(req.body);
 res.send("You sent:" + req.body.post);
axios.get('https://api.example.com/data')
  .then(response => {
    const externalData = response.data;
    res.send({
      message: "You sent: " + req.body.post,
      externalData: externalData
    });
  })
  .catch(error => {
    console.error('Error fetching external data:', error);
    res.status(500).send('Error fetching external data');
  });
});

app.post("/api/func", (req, res) => {
  console.log(req.body);
  res.send("You sent:" + req.body.post);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
