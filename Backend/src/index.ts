import express from "express";
import cors from "cors";
const { router } = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use("/api", router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});