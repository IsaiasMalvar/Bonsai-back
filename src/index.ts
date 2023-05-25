import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/index.js";
import chalk from "chalk";

const debug = createDebug("bonsai-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.blue(`http://localhost:${port}`));
});
