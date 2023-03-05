const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(require("./routes/todoList.js"));
app.use(require("./routes/auth.js"));
const db = process.env.ATLAS_URI;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});