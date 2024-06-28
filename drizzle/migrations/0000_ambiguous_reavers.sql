CREATE TABLE `coleccionapp_accounts` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `coleccionapp_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_attributes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`collection_id` integer NOT NULL,
	`name` text(256) NOT NULL,
	`data_type` text(50) NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `coleccionapp_collections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_collections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text(255) NOT NULL,
	`name` text(256) NOT NULL,
	`description` text(1000),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `coleccionapp_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_item_attributes` (
	`item_id` integer NOT NULL,
	`attribute_id` integer NOT NULL,
	`value` text(1000) NOT NULL,
	PRIMARY KEY(`attribute_id`, `item_id`),
	FOREIGN KEY (`item_id`) REFERENCES `coleccionapp_items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`attribute_id`) REFERENCES `coleccionapp_attributes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`collection_id` integer NOT NULL,
	`name` text(256) NOT NULL,
	`description` text(1000),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`collection_id`) REFERENCES `coleccionapp_collections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_sessions` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `coleccionapp_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_users` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer DEFAULT CURRENT_TIMESTAMP,
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `coleccionapp_verificationTokens` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `coleccionapp_accounts` (`userId`);--> statement-breakpoint
CREATE INDEX `attr_collectionId_idx` ON `coleccionapp_attributes` (`collection_id`);--> statement-breakpoint
CREATE INDEX `attr_name_idx` ON `coleccionapp_attributes` (`name`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `coleccionapp_collections` (`user_id`);--> statement-breakpoint
CREATE INDEX `collection_name_idx` ON `coleccionapp_collections` (`name`);--> statement-breakpoint
CREATE INDEX `itemId_idx` ON `coleccionapp_item_attributes` (`item_id`);--> statement-breakpoint
CREATE INDEX `attributeId_idx` ON `coleccionapp_item_attributes` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `item_collectionId_idx` ON `coleccionapp_items` (`collection_id`);--> statement-breakpoint
CREATE INDEX `item_name_idx` ON `coleccionapp_items` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `coleccionapp_sessions` (`userId`);