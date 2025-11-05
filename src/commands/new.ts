import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

interface NewCommandOptions {
  orm: string;
}

export async function createNewProject(projectName: string) {
  const templateDir = path.join(__dirname, "../templates/base-project");
  const targetDir = path.resolve(process.cwd(), projectName);

  try {
    // Copiamos el template completo
    await fs.copy(templateDir, targetDir);

    // Archivos donde reemplazaremos variables
    const extsToReplace = [".ts", ".json", ".md", ".env"];

    function replacePlaceholders(dir: string) {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const filePath = path.join(dir, entry);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          replacePlaceholders(filePath);
        } else if (extsToReplace.some(ext => entry.endsWith(ext))) {
          let content = fs.readFileSync(filePath, "utf8");
          content = content.replace(/__PROJECT_NAME__/g, projectName);
          content = content.replace(/{{projectName}}/g, projectName);
          fs.writeFileSync(filePath, content, "utf8");
        }
      }
    }

    replacePlaceholders(targetDir);

    console.log(`📦 Proyecto creado en ${chalk.cyan(projectName)}`);
    console.log(`👉 Ejecuta:\n  cd ${projectName}\n  npm install\n  npm run dev`);
  } catch (error) {
    console.error("❌ Error al crear el proyecto:", error);
  }
}

export async function handleNewCommand(projectName: string, options: NewCommandOptions) {
  try {
    const targetDir = path.resolve(process.cwd(), projectName);

    // Verificar si ya existe
    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`❌ La carpeta ${projectName} ya existe.`));
      process.exit(1);
    }

    // Copiar template base
    await createNewProject(projectName) // fs.copy(templateDir, targetDir);
    console.log(chalk.green(`📦 Proyecto creado en ${projectName}`));

/*     // Actualizar package.json del proyecto
    const pkgPath = path.join(targetDir, "package.json");
    const pkg = await fs.readJSON(pkgPath);
    pkg.name = projectName;
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 }); */

    // Si usa Prisma
    if (options.orm === "prisma") {
      console.log(chalk.yellow("⚙️  Integrando Prisma..."));
      const prismaSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
`;
      await fs.ensureDir(path.join(targetDir, "prisma"));
      await fs.writeFile(path.join(targetDir, "prisma/schema.prisma"), prismaSchema.trim());
      console.log(chalk.green("✅ Prisma configurado"));
    }

    console.log(chalk.cyan("\n🚀 Instrucciones:"));
    console.log(chalk.white(`cd ${projectName}`));
    console.log(chalk.white("npm install"));
    console.log(chalk.white("npm run dev"));
    console.log(chalk.gray("\n¡Disfruta tu proyecto Breve ☕!\n"));
  } catch (error: any) {
    console.error(chalk.red("❌ Error al crear el proyecto:"), error.message);
  }
}
