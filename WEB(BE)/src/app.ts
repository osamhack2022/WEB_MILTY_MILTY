import express from "express";
import { createServer } from "http";
const app = express();
app.get("/", (req, res) => {
  res.send("Hello world!");
});
const server = createServer(app);
server.listen(process.env.PORT || 5000);
