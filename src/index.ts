import Server from "./services/server";
import Config from "./config/config";
import { connectToDB } from "./models/db";
import { Logger } from "./services/logger";
import os from "os";
import cluster from "cluster";

const NUM_CPUs = os.cpus().length;
const CLUSTER = false;

if (CLUSTER) {
  if (cluster.isPrimary) {
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

function init(): any {
  const PORT = Config.PORT;

  connectToDB().then(() => {
    Logger.info("Connect to Database!");
    const server = Server.listen(PORT, () => {
      Logger.info(`Server up in port ${PORT}`);
    });

    server.on("error", (error) => Logger.error(`Server error: ${error}`));
  });
}
