const mongoose = require("mongoose");
const env=require("dotenv")

env.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(console.log("connected successfully"))
  .catch((err) => console.log(err));
