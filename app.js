const express = require("express");
const app = express();
const git = require("./routes/git");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", git);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`you are connceted with htpp://localhost:${PORT}`);
});
