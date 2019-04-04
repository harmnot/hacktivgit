const express = require("express");
const cors = require("cors");
const app = express();
const git = require("./routes/git");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", git);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`you are connceted with http://localhost:${PORT}`);
});
