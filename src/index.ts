import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import connectToDatabase from "./database/connectToDatabase.js";
import { app } from "./server/index.js";

const debug = createDebug("bonsai-api:root");

const port = process.env.PORT ?? 4000;
const mongodbConnection = process.env.MONGO_DB_CONNECTION!;

if (!mongodbConnection) {
  debug(chalk.red("Missing environment variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.blue(`http://localhost:${port}`));
});

try {
  await connectToDatabase(mongodbConnection);

  debug(chalk.green("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${(error as Error).message}`);
}
