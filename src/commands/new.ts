import fs from "fs-extra";
import path from "path";

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

    console.log(`📦 Proyecto creado en ${projectName}`);
    console.log(`� Ejecuta:\n  cd ${projectName}\n  npm install\n  npm run dev`);
  } catch (error) {
    console.error("❌ Error al crear el proyecto:", error);
  }
}

export async function handleNewCommand(projectName: string, options: NewCommandOptions) {
  try {
    const targetDir = path.resolve(process.cwd(), projectName);

    // Verificar si ya existe
    if (fs.existsSync(targetDir)) {
      console.error(`❌ La carpeta ${projectName} ya existe.`);
      process.exit(1);
    }

    // Copiar template base
    await createNewProject(projectName) // fs.copy(templateDir, targetDir);

    // Si usa Prisma
    if (options.orm === "prisma") {
      console.log("⚙️  Integrando Prisma...");
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
      console.log("✅ Prisma configurado");
    }

    console.log("\n🚀 Instrucciones:");
    console.log(`cd ${projectName}`);
    console.log("npm install");
    console.log("npm run dev");
    console.log("\n¡Disfruta tu proyecto Breve ☕!\n");
  } catch (error: any) {
    console.error("❌ Error al crear el proyecto:", error.message);
  }
}
