import { program } from "commander";
import { prompt } from "inquirer";
import { spawn } from "child_process";
import compact from "lodash/compact";
import fs from "fs";
import path from "path";
import chalk from "chalk";

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
    choices: ["ScanCreated", "IssueDiscovered"],
  });

const promptForStage = () =>
  promptForValue({
    message: "Which stage should be used?",
    choices: ["prod"],
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

const getEnvFileValue = (options: { envFile: string }) => {
  return path.resolve(__dirname, "..", options.envFile);
};

program
  .command("deploy")
  .requiredOption(
    "-e, --env-file <file-path>",
    "A dotenv environment file which will be loaded before the function is invoked"
  )
  .option("-s, --stage <stage>")
  .description("Deploy all functions")
  .action(async function (options) {
    const envFile = getEnvFileValue(options);
    const stage = options.stage || (await promptForStage());

    const cmd = compact([
      `npx dotenv -e ${envFile} --`,
      "npx sls deploy",
      `-s ${stage}`,
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
    const envFile = useEnvFile ? getEnvFileValue(options) : "";
    const hasEnvFile = useEnvFile && fs.existsSync(envFile);

    const useDataFile = Boolean(options.dataFile);
    const dataFile = useDataFile ? options.dataFile : await promptForDataFile();
    const hasDataFile = fs.existsSync(dataFile);

    if (hasDataFile) {
      console.log(`Event file ${functionName}.json found`);
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
