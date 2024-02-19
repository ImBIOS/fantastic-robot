CREATE TABLE `fantastic-robot_jackson_index` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(250) NOT NULL,
	`storeKey` varchar(250) NOT NULL,
	CONSTRAINT `fantastic-robot_jackson_index_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fantastic-robot_jackson_store` (
	`key` varchar(250) NOT NULL,
	`value` text NOT NULL,
	`iv` varchar(64),
	`tag` varchar(64),
	`namespace` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`modifiedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fantastic-robot_jackson_store_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `fantastic-robot_jackson_ttl` (
	`key` varchar(250) NOT NULL,
	`expiresAt` bigint NOT NULL,
	CONSTRAINT `fantastic-robot_jackson_ttl_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
ALTER TABLE `fantastic-robot_point` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `fantastic-robot_user` ADD `createdAt` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
CREATE INDEX `_jackson_index_key` ON `fantastic-robot_jackson_index` (`key`);--> statement-breakpoint
CREATE INDEX `_jackson_index_key_store` ON `fantastic-robot_jackson_index` (`key`,`storeKey`);--> statement-breakpoint
CREATE INDEX `_jackson_store_namespace` ON `fantastic-robot_jackson_store` (`namespace`);--> statement-breakpoint
CREATE INDEX `_jackson_ttl_expires_at` ON `fantastic-robot_jackson_ttl` (`expiresAt`);--> statement-breakpoint
ALTER TABLE `fantastic-robot_user` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `fantastic-robot_user` DROP COLUMN `token`;