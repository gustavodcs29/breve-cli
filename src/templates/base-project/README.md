# 🚀 __PROJECT_NAME__

Proyecto base generado automáticamente con **breve-cli**.

## 🧩 Scripts útiles

```bash
npm run dev         # Inicia en modo desarrollo
npm run build       # Compila TypeScript
npm run start       # Ejecuta compilado
```

⚙️ Estructura del proyecto
```
src/
 ├── app.ts
 ├── server.ts
 ├── routes/
 ├── controllers/
 ├── middlewares/
 ├── modules/
 ├── dto/
 ├── models/
 ├── types/
 └── prisma/
```

🗃️ Prisma

Configura tu base de datos en .env y ejecuta:

```bash
npx prisma migrate dev
npx prisma generate
```