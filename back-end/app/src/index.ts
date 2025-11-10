import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import path from "node:path";

export const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: "Monorepo Backend API",
          version: "1.0.0",
        },
      },
      references: fromTypes(
        process.env.NODE_ENV === "production" ? "dist/index.d.ts" : "src/index.ts",
        {
          // Point to monorepo backend root so typegen works reliably in monorepo
          projectRoot: path.join("..", import.meta.dir),
        }
      ),
    })
  )
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
