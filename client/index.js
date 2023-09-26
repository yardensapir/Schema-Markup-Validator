import express from "express";
import cors from "cors";
import schemaRouter from "./routers/schema.router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(schemaRouter);

const PORT = 8000;

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
});

