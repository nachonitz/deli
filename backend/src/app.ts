import express from "express";
import accountRoutes from "./infrastructure/routes/accountRoutes";
import "reflect-metadata";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/accounts", accountRoutes);

export default app;
