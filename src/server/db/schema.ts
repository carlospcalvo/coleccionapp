import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `coleccionapp_${name}`);

// Collections table
export const collections = createTable(
  "collections",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 1000 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
    collectionNameIdx: index("collection_name_idx").on(table.name),
  }),
);

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  items: many(items),
  attributes: many(attributes),
}));

// Items table
export const items = createTable(
  "items",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    collectionId: int("collection_id", { mode: "number" })
      .notNull()
      .references(() => collections.id),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 1000 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }),
  },
  (table) => ({
    itemCollectionIdIdx: index("item_collectionId_idx").on(table.collectionId),
    itemNameIdx: index("item_name_idx").on(table.name),
  }),
);

export const itemsRelations = relations(items, ({ one, many }) => ({
  collection: one(collections, {
    fields: [items.collectionId],
    references: [collections.id],
  }),
  itemAttributes: many(itemAttributes),
}));

// Attributes table
export const attributes = createTable(
  "attributes",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    collectionId: int("collection_id", { mode: "number" })
      .notNull()
      .references(() => collections.id),
    name: text("name", { length: 256 }).notNull(),
    dataType: text("data_type", { length: 50 }).notNull(),
  },
  (table) => ({
    attributeCollectionIdIdx: index("attr_collectionId_idx").on(
      table.collectionId,
    ),
    attributeNameIdx: index("attr_name_idx").on(table.name),
  }),
);

export const attributesRelations = relations(attributes, ({ one, many }) => ({
  collection: one(collections, {
    fields: [attributes.collectionId],
    references: [collections.id],
  }),
  itemAttributes: many(itemAttributes),
}));

// Item_Attributes table
export const itemAttributes = createTable(
  "item_attributes",
  {
    itemId: int("item_id", { mode: "number" })
      .notNull()
      .references(() => items.id),
    attributeId: int("attribute_id", { mode: "number" })
      .notNull()
      .references(() => attributes.id),
    value: text("value", { length: 1000 }).notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.itemId, table.attributeId] }),
    itemIdIdx: index("itemId_idx").on(table.itemId),
    attributeIdIdx: index("attributeId_idx").on(table.attributeId),
  }),
);

export const itemAttributesRelations = relations(itemAttributes, ({ one }) => ({
  item: one(items, {
    fields: [itemAttributes.itemId],
    references: [items.id],
  }),
  attribute: one(attributes, {
    fields: [itemAttributes.attributeId],
    references: [attributes.id],
  }),
}));

export const users = createTable("users", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "accounts",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "sessions",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationTokens",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
