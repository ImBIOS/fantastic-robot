import { relations, sql } from "drizzle-orm";
import {
	bigint,
	index,
	int,
	mysqlTableCreator,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";
import type { Account } from "next-auth";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
	(name) => `fantastic-robot_${name}`,
);

// SECTION - Auth.js START
export const users = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", {
		mode: "date",
		fsp: 3,
	}).default(sql`CURRENT_TIMESTAMP(3)`),
	image: varchar("image", { length: 255 }),

	// NOTE Added
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accounts = mysqlTable(
	"account",
	{
		userId: varchar("userId", { length: 255 }).notNull(),
		type: varchar("type", { length: 255 }).$type<Account["type"]>().notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: int("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("userId_idx").on(account.userId),
	}),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
	"session",
	{
		sessionToken: varchar("sessionToken", { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar("userId", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(session) => ({
		userIdIdx: index("userId_idx").on(session.userId),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
	"verificationToken",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);
// SECTION - Auth.js END

// SECTION - BoxyHQ SAML SSO START
export const jacksonIndex = mysqlTable(
	"jackson_index",
	{
		id: int("id").primaryKey().autoincrement(),
		key: varchar("key", { length: 250 }).notNull(),
		storeKey: varchar("storeKey", { length: 250 }).notNull(),
	},
	(table) => ({
		keyIdx: index("_jackson_index_key").on(table.key),
		storeKeyIdx: index("_jackson_index_key_store").on(
			table.key,
			table.storeKey,
		),
	}),
);

export const jacksonStore = mysqlTable(
	"jackson_store",
	{
		key: varchar("key", { length: 250 }).notNull().primaryKey(),
		value: text("value").notNull(),
		iv: varchar("iv", { length: 64 }),
		tag: varchar("tag", { length: 64 }),
		namespace: varchar("namespace", { length: 64 }),
		createdAt: timestamp("createdAt").defaultNow().notNull(),
		modifiedAt: timestamp("modifiedAt").onUpdateNow().defaultNow().notNull(),
	},
	(table) => ({
		namespaceIdx: index("_jackson_store_namespace").on(table.namespace),
	}),
);

export const jacksonTtl = mysqlTable(
	"jackson_ttl",
	{
		key: varchar("key", { length: 250 }).notNull().primaryKey(),
		expiresAt: bigint("expiresAt", { mode: "bigint" }).notNull(),
	},
	(table) => ({
		expiresAtIdx: index("_jackson_ttl_expires_at").on(table.expiresAt),
	}),
);
// SECTION - BoxyHQ SAML SSO END

export const points = mysqlTable("point", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	exp: int("exp").default(0).notNull(),
	userId: varchar("userId", { length: 255 }),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").onUpdateNow().defaultNow().notNull(),
});

export const pointsRelations = relations(points, ({ one }) => ({
	users: one(users, { fields: [points.userId], references: [users.id] }),
}));
