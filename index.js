const express = require("express");
const cors = require("cors");
const userRouter = require("./users/usersRouter");

const PORT = process.env.PORT || 5500;

class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.server = express();
    // this.initMiddlewares();
    this.initRoutes();
    this.listen();
  }

  //   initMiddlewares() {
  //     this.server.use(express.json());
  //     this.server.use(cors());
  //     this.server.options("*", cors());
  //   }

  initRoutes() {
    this.server.use("/users", userRouter);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

const server = new Server();
server.start();