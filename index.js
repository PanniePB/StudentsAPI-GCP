import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./db/index.js";
import router from "./routes/students.js";

const app = express();
const port = process.env.PORT || 3000;

try {
  const result = await sequelize.sync();
  console.log(result);
} catch (error) {
  console.log(error);
}

app.use(bodyParser.json());
app.use("/students", router);

app.get("/", (req, res) => {
  res.send("Hello Charlie");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
