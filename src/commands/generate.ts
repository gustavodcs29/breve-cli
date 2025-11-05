import fs from "fs-extra";
import path from "path";
import { capitalize, pascalCase } from "../utils/strings";

const TEMPLATE_DIR = path.resolve(__dirname, "../templates");

export async function handleGenerateCommand(type: string, name: string) {
  try {
    const supportedTypes = [
      "controller",
      "router",
      "middleware",
      "dto",
      "type",
      "model",
    ];

    if (!supportedTypes.includes(type)) {
      console.error(`❌ Tipo no soportado: ${type}`);
      console.warn(`Tipos soportados: ${supportedTypes.join(", ")}`);
      process.exit(1);
    }

    const fileName = `${name.toLowerCase().replace(/\s+/g, "-")}.${type}.ts`;

    const destDir = path.resolve(process.cwd(), "src", type + "s");
    const destPath = path.join(destDir, fileName);
    const templatePath = path.join(TEMPLATE_DIR, `${type}.ts`);

    await fs.ensureDir(destDir);

    if (!fs.existsSync(templatePath)) {
      console.error(`❌ No se encontró la plantilla para '${type}'`);
      process.exit(1);
    }

    let template = await fs.readFile(templatePath, "utf-8");
    const pascalName = pascalCase(name);
    template = template
      .replace(/__NAME__/g, name)
      .replace(/__CLASS_NAME__/g, pascalName);

    await fs.writeFile(destPath, template);
    console.log(`✅ ${type} '${fileName}' creado en src/${type}s/`);
  } catch (error: any) {
    console.error("❌ Error generando archivo:", error.message);
  }
}

export async function generateModule(name: string) {
  const projectRoot = process.cwd();
  const moduleDir = path.join(projectRoot, "src", "modules", name);

  const templateDir = path.join(__dirname, "../templates/module");
  const capitalized = capitalize(name);

  if (fs.existsSync(moduleDir)) {
    console.error(`❌ El módulo ${name} ya existe`);
    return;
  }

  await fs.mkdirp(moduleDir);

  // Copiar templates reemplazando placeholders
  const files = fs.readdirSync(templateDir);
  for (const file of files) {
    const template = await fs.readFile(path.join(templateDir, file), "utf8");
    const content = template
      .replaceAll("__NAME__", name)
      .replaceAll("__CAPITALIZED_NAME__", capitalized);

    const dest = path.join(moduleDir, file.replace("template", name));
    await fs.writeFile(dest, content);
  }

  // Registrar el módulo en src/routes/index.ts
  const routesPath = path.join(projectRoot, "src", "routes", "index.ts");
  if (!fs.existsSync(routesPath)) {
    await fs.mkdirp(path.dirname(routesPath));
    await fs.writeFile(
      routesPath,
      `import { Router } from "express";

// ANCLA: IMPORTACIONES

const router = Router();

// ANCLA: RUTAS

export default router;
`
    );
  }

  let routesContent = await fs.readFile(routesPath, "utf8");

  // Verifica si ya está registrado
  if (!routesContent.includes(`${name}Router`)) {
    const importStatement = `import { ${name}Router } from "../modules/${name}";`;
    const useStatement = `router.use("/${name}", ${name}Router);`;

    routesContent = routesContent.replace('// ANCLA: IMPORTACIONES', `${importStatement}\n// ANCLA: IMPORTACIONES`);
    routesContent = routesContent.replace('// ANCLA: RUTAS', `${useStatement}\n// ANCLA: RUTAS`);

    await fs.writeFile(routesPath, routesContent);
  }

  console.log(`✅ Módulo '${name}' creado y registrado exitosamente.`);
}
