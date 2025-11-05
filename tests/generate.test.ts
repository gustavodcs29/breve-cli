
import fs from "fs-extra";
import { generateModule } from "../src/commands/generate";
import path from "path";

// 1. Le decimos a Jest que mockee 'fs-extra'.
// Todas las llamadas a 'fs' serán a una versión simulada.
jest.mock("fs-extra");

// Para tener autocompletado y tipos correctos en nuestro mock
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("generateModule", () => {
  // 2. Limpiamos los mocks antes de cada prueba para asegurar que los tests son independientes.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería crear un nuevo módulo y registrar la ruta correctamente", async () => {
    // --- ARRANGE (Preparación) ---

    const moduleName = "test-module";

    // Simulamos que el módulo y el archivo de rutas no existen al principio.
    mockedFs.existsSync.mockReturnValue(false);

    // Simulamos la lectura del directorio de plantillas.
    (mockedFs.readdirSync as jest.Mock).mockReturnValue([
      "template.controller.ts",
      "template.service.ts",
      "template.router.ts",
    ]);

    // Simulamos la lectura de cada archivo de plantilla.
    // Usamos mockResolvedValue porque readFile es una promesa.
    (mockedFs.readFile as unknown as jest.Mock)
      .mockResolvedValueOnce("// Template content for __NAME__ with __CAPITALIZED_NAME__")
      .mockResolvedValueOnce("// Template content for __NAME__ with __CAPITALIZED_NAME__")
      .mockResolvedValueOnce("// Template content for __NAME__ with __CAPITALIZED_NAME__")
      // 4. Añadimos el mock para la lectura de src/routes/index.ts
      .mockResolvedValueOnce(`import { Router } from "express";

// ANCLA: IMPORTACIONES

const router = Router();

// ANCLA: RUTAS

export default router;`);

    // --- ACT (Ejecución) ---

    // Ejecutamos la función que queremos probar.
    await generateModule(moduleName);

    // --- ASSERT (Verificación) ---

    // Verificamos que se intentó crear el directorio del módulo.
    expect(mockedFs.mkdirp).toHaveBeenCalledWith(
      expect.stringContaining(path.join("src", "modules", moduleName))
    );

    // Verificamos que se escribieron los 3 archivos del módulo.
    expect(mockedFs.writeFile).toHaveBeenCalledTimes(5); // 3 del módulo + 1 para crear index.ts + 1 para modificarlo

    // Verificamos el contenido de uno de los archivos creados.
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining(`${moduleName}.controller.ts`),
      "// Template content for test-module with Test-module"
    );

    // Verificamos que se intentó escribir en el archivo de rutas principal.
    const routesIndexPath = expect.stringContaining(path.join("src", "routes", "index.ts"));
    const expectedRoutesContent = expect.stringContaining(
      `router.use("/${moduleName}", ${moduleName}Router);`
    );

    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      routesIndexPath,
      expect.any(String) // Primero lo crea
    );
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      routesIndexPath,
      expectedRoutesContent // Luego lo modifica
    );
  });
});
