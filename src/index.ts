import { Command } from "commander";
import { handleNewCommand } from "./commands/new";
import { handleGenerateCommand, generateModule } from "./commands/generate";

const program = new Command();

program
    .name("breve")
    .description("CLI para crear proyectos Express + TypeScript")
    .version("0.1.0");

program
    .command("new <project-name>")
    .description("Crea un nuevo proyecto Express + TypeScript")
    .option("--orm <orm>", "Integrar un ORM (por ahora solo 'prisma')", "none")
    .action((name, options) => handleNewCommand(name, options));

program
    .command("g <type> <name>")
    .alias("generate")
    .description("Genera módulos, controladores, routers, etc.")
    .action(async (type, name) => {
        if (type === "module") {
            await generateModule(name);
        } else {
            await handleGenerateCommand(type, name);
        }
    });


program.parse(process.argv);
