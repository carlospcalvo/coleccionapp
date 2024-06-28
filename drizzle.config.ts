import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default env.NODE_ENV === "development"
  ? ({
      schema: "./src/server/db/schema.ts",
      out: "./drizzle/migrations",
      dialect: "sqlite",
      dbCredentials: {
        url: env.DATABASE_URL,
      },
      tablesFilter: ["coleccionapp_*"],
      // Print all statements
      verbose: true,
      // Always ask for my confirmation
      strict: true,
    } satisfies Config)
  : ({
      schema: "./src/server/db/schema.ts",
      out: "./drizzle/migrations",
      dialect: "sqlite",
      driver: "turso",
      dbCredentials: {
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
      },
      tablesFilter: ["coleccionapp_*"],
    } satisfies Config);
