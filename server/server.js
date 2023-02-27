const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(require("./routes/todoList.js"));
//app.use(require("./routes/login"));
app.use(require("./routes/auth.js"));
const db = process.env.ATLAS_URI;
 
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});