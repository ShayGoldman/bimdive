import { program } from "commander";
import { prompt } from "inquirer";
import { spawn } from "child_process";
import compact from "lodash/compact";
import sortBy from "lodash/sortBy";
import fs from "fs";
import YAML from "yaml";
import path from "path";
import chalk from "chalk";

const serverlessConfigFile = fs.readFileSync(
  path.resolve(__dirname, "../serverless.yml"),
  "utf8"
);
const serverlessConfig = YAML.parse(serverlessConfigFile);

const AVAILABLE_ENVIRONMENTS = fs
  .readdirSync(path.resolve(__dirname, ".."))
  .filter((file) => file.includes(".env"));

const AVAILABLE_FUNCTIONS = sortBy(Object.keys(serverlessConfig.functions));

async function execute(cmd: string) {
  console.log(chalk.yellow(cmd));
  const [invokedCmd, ...args] = cmd.split(" ");
  spawn(invokedCmd, args, {
    cwd: process.cwd(),
    shell: true,
    stdio: "inherit",
  });
}

async function promptForValue<T extends string | number>({
  choices,
  message,
}: {
  choices: T[];
  message: string;
}): Promise<T> {
  const { value } = await prompt([
    { name: "value", message, type: "list", choices },
  ]);
  return value;
}

const promptForFunction = () =>
  promptForValue({
    message: "Which function should be invoked?",
    choices: AVAILABLE_FUNCTIONS,
  });

const promptForStage = () =>
  promptForValue({
    message: "Which stage should be used?",
    choices: ["prod"],
  });
const promptForEnvironmentFile = () =>
  promptForValue({
    message: "Which environment should be used?",
    choices: AVAILABLE_ENVIRONMENTS,
  });

const promptForRemote = () =>
  promptForValue({
    message: "Which environment should execute?",
    choices: ["local", "remote"],
  });
const promptForDataFile = async () => {
  const dataFile = await promptForValue({
    message: "Which data file should be used?",
    choices: fs.readdirSync(path.resolve(__dirname, "..", ".data-files")),
  });

  return path.resolve(__dirname, "../.data-files", dataFile);
};

const getEnvFileValue = async (options: { envFile: string }) => {
  const { envFile } = options;
  return envFile
    ? path.resolve(__dirname, "..", envFile)
    : await promptForEnvironmentFile();
};

program
  .command("deploy")
  .option(
    "-e, --env-file <file-path>",
    "A dotenv environment file which will be loaded before the function is invoked"
  )
  .option("-s, --stage <stage>")
  .option("-f, --function-name <function-name>")
  .description("Deploy all functions")
  .action(async function (options) {
    let { functionName } = options;
    const envFile = await getEnvFileValue({ envFile: options.envFile });
    const stage = options.stage || (await promptForStage());

    if (functionName && !AVAILABLE_FUNCTIONS.includes(functionName)) {
      functionName = await promptForFunction();
    }

    const cmd = compact([
      `npx dotenv -e ${envFile} --`,
      "npx sls deploy",
      `-s ${stage}`,
      functionName && `-f ${functionName}`,
    ]).join(" ");

    execute(cmd);
  });

program
  .command("dev")
  .option("-f, --function-name <function-name>")
  .option("-s, --stage <stage>", "The stage used for deployment")
  .option(
    "-e, --env-file <file-path>",
    "A dotenv environment file which will be loaded before the function is invoked"
  )
  .option(
    "-d, --data-file <file-path>",
    "JSON file used to inkove the function with"
  )
  .option(
    "-r, --remote",
    "Adding this flag causes the remote labmda function to be invoked. Note: Cannot be use with the --local flag"
  )
  .option(
    "-l, --local",
    "Adding this flag causes the local labmda function to be invoked"
  )
  .description("Build & execute the function")
  .action(async function (options) {
    const functionName = options.functionName || (await promptForFunction());
    const stage = options.stage || (await promptForStage());
    const isRemote = options.local
      ? false
      : options.remote || (await promptForRemote()) === "remote";

    const useEnvFile = Boolean(options.envFile);
    const envFile = useEnvFile
      ? await getEnvFileValue({ envFile: options.envFile })
      : "";
    const hasEnvFile = useEnvFile && fs.existsSync(envFile);

    const useDataFile = Boolean(options.dataFile);
    const dataFile = useDataFile ? options.dataFile : await promptForDataFile();
    const hasDataFile = fs.existsSync(dataFile);

    if (hasDataFile) {
      console.log(`Event file ${path.basename(dataFile)} found`);
    }

    const cmd = compact([
      hasEnvFile && `npx dotenv -e ${envFile} --`,
      "npx sls invoke",
      !isRemote && "local",
      `-s ${stage}`,
      `-f ${functionName}`,
      hasDataFile && `-p ${dataFile}`,
    ]).join(" ");

    execute(cmd);
  });

program
  .name("commander")
  .version("x.x.x")
  .usage("[options] [command]")
  .parse(process.argv);
