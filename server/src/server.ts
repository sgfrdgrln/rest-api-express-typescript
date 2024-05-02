import express from "express";
import { Express } from "express-serve-static-core";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import router from "./router";
import { Database } from "./Database/db";

const PORT = 3500 || process.env.PORT;
dotenv.config();

class Server {
  private app: Express;
  private db: Database;
  constructor() {
    this.app = express();
    this.runMiddleWare();
    this.db = new Database();
  }

  async start() {
    this.app.listen(PORT, () => {
      try {
        console.log(`Connected to port - ${PORT}`);
      } catch (error) {
        console.log(error);
      }
    });

    await this.db.connectDB(process.env.LOCAL_DATABASE_URI);
  }

  private runMiddleWare() {
    this.app.use(express.json());
    this.app.use(cors({
        credentials: true
    }))
    this.app.use(compression())
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use('/', router());
  }
}

const server = new Server();
server.start();