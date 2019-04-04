const [express, cors, mongoose] = [
  require("express"),
  require("cors"),
  require("mongoose")
];
require("dotenv").config();
const app = express();
const git = require("./routes/git");
const uri = `mongodb+srv://${process.env.MONGO_DB_NAME}:${
  process.env.MONGO_DB_KEY
}@hamrnot-iasow.mongodb.net/hacktivgit?retryWrites=true`;

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`======> MongoDB connected <======`))
  .catch(err => console.log(err, "ini error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", git);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`you are connceted with http://localhost:${PORT}`);
});
