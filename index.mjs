import { Application } from './server/application.mjs';
import { Server } from './server/server.mjs'


const myServer = new Server();
const app = new Application(myServer)

app
  .start()
  .catch((error) => {
    console.warn(error);
    process.exit();
  });
