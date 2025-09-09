import express from "express";
import cors from "cors";
import empanadasCollectionRouter from "./routes/empanadas.collection.js";
import empanadaItemRouter from "./routes/empanada.item.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/empanadas", empanadasCollectionRouter);
app.use("/api/empanada", empanadaItemRouter);

export default app;
