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

program
  .command("deploy")
  .requiredOption("-e, --env-file <file-path>")
  .option("-s, --stage <stage>")
  .description("Deploy all functions")
  .action(async function (options) {
    const envFile = path.resolve(__dirname, "..", options.envFile);
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
  .option("-s, --stage <stage>")
  .option("-e, --env-file <file-path>")
  .option("-r, --remote")
  .option("-l, --local")
  .description("Build & execute the function")
  .action(async function (options) {
    const functionName = options.functionName || (await promptForFunction());
    const stage = options.stage || (await promptForStage());
    const isRemote = options.local
      ? false
      : options.remote || (await promptForRemote()) === "remote";

    const useEnvFile = Boolean(options.envFile);
    const envFile = useEnvFile
      ? path.resolve(__dirname, "..", options.envFile)
      : "";

    const eventFile = path.resolve(
      __dirname,
      `../.events/${functionName}.json`
    );
    const hasEventFile = fs.existsSync(eventFile);
    const hasEnvFile = useEnvFile && fs.existsSync(envFile);

    if (hasEventFile) {
      console.log(`Event file ${functionName}.json found`);
    }

    const cmd = compact([
      hasEnvFile && `npx dotenv -e ${envFile} --`,
      "npx sls invoke",
      !isRemote && "local",
      `-s ${stage}`,
      `-f ${functionName}`,
      hasEventFile && `-p ${eventFile}`,
    ]).join(" ");

    execute(cmd);
  });

program.version("x.x.x");
program.parse(process.argv);
