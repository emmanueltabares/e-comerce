import MyServer from "./services/server";
import initWsServer from "./services/socket";
import Config from "./config/config";
import { Logger } from "./services/logger";
import os from "os";
import cluster from "cluster";

initWsServer(MyServer);

const NUM_CPUs = os.cpus().length;
const CLUSTER_MODE = false;

if (CLUSTER_MODE) {
  if (cluster.isMaster) {
    console.log(`NUMERO DE CPUS ===> ${NUM_CPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < NUM_CPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });
  } else {
    init();
  }
} else {
  init();
}

export async function init() {
  const PORT = Config.PORT;
  const server = MyServer.listen(PORT, () => {
    Logger.info(`Server up in port ${PORT} - PID WORKER ${process.pid}`);
    server.on("error", (error) => Logger.error(`Server error: ${error}`));
  })
};

