import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://127.0.0.1:8080/");
});

const MONGO_URL = process.env.MONGO_URL || "";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => {
  console.log("DB OK!");
});

mongoose.connection.on("error", (error: Error) => {
  console.log(error.message);
});

app.use("/", router());
