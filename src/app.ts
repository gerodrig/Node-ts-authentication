import { envs } from './config';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  //TODO: await database connection
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  //TODO: await server start
  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
