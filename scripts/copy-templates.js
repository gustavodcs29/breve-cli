import fs from "fs-extra";
import path from "path";

const src = path.resolve("src/templates");
const dest = path.resolve("dist/templates");

fs.copy(src, dest)
  .then(() => console.log("✅ Templates copiados a dist"))
  .catch((err) => {
    console.error("❌ Error copiando templates:", err);
    process.exit(1);
  });
