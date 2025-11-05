
import fs from "fs-extra";
import { handleNewCommand } from "../src/commands/new";
import path from "path";

// Mockeamos fs-extra para no tocar el sistema de archivos real
jest.mock("fs-extra");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("Comando 'new'", () => {
  beforeEach(() => {
    // Limpiamos todos los mocks antes de cada prueba
    jest.clearAllMocks();
    // Mock para process.exit para que no termine la ejecución de los tests
    jest.spyOn(process, "exit").mockImplementation((() => {}) as () => never);
  });

  it("debería crear un proyecto básico correctamente", async () => {
    const projectName = "mi-nuevo-proyecto";

    // Simulamos que el directorio no existe
    mockedFs.existsSync.mockReturnValue(false);
    // Simulamos la lectura de archivos para el reemplazo de placeholders
    (mockedFs.readdirSync as jest.Mock).mockReturnValue(["package.json", "README.md"]);
    (mockedFs.readFileSync as jest.Mock).mockReturnValue("Contenido con __PROJECT_NAME__");
    (mockedFs.statSync as jest.Mock).mockReturnValue({ isDirectory: () => false });

    await handleNewCommand(projectName, { orm: "" });

    // Verificamos que se copió la plantilla base
    expect(mockedFs.copy).toHaveBeenCalledWith(
      expect.stringContaining(path.join("templates", "base-project")),
      expect.stringContaining(projectName)
    );

    // Verificamos que se reemplazaron los placeholders
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(path.join(projectName, "package.json")),
      "Contenido con mi-nuevo-proyecto",
      "utf8"
    );
  });

  it("debería integrar Prisma si se especifica la opción --orm", async () => {
    const projectName = "proyecto-con-prisma";

    mockedFs.existsSync.mockReturnValue(false);
    (mockedFs.readdirSync as jest.Mock).mockReturnValue([]);
    (mockedFs.statSync as jest.Mock).mockReturnValue({ isDirectory: () => false });

    await handleNewCommand(projectName, { orm: "prisma" });

    // Verificamos que se creó el directorio de prisma
    expect(mockedFs.ensureDir).toHaveBeenCalledWith(expect.stringContaining("prisma"));

    // Verificamos que se escribió el schema.prisma
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining("schema.prisma"),
      expect.stringContaining("datasource db")
    );
  });
});