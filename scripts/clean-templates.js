import fs from "fs";
import path from "path";

const dir = path.resolve("dist/templates");

function removeJSFiles(folder) {
  if (!fs.existsSync(folder)) return;
  const entries = fs.readdirSync(folder);
  for (const entry of entries) {
    const full = path.join(folder, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      removeJSFiles(full);
    } else if (entry.endsWith(".js")) {
      fs.unlinkSync(full);
    }
  }
}

removeJSFiles(dir);
console.log("🧹 Archivos .js en dist/templates eliminados correctamente.");
