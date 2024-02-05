CREATE TABLE `alpaca-bison-crude_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `alpaca-bison-crude_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `alpaca-bison-crude_point` (
	`id` varchar(255) NOT NULL,
	`exp` int NOT NULL DEFAULT 0,
	`userId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alpaca-bison-crude_point_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alpaca-bison-crude_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `alpaca-bison-crude_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `alpaca-bison-crude_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	`token` int DEFAULT 120,
	CONSTRAINT `alpaca-bison-crude_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alpaca-bison-crude_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `alpaca-bison-crude_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `alpaca-bison-crude_account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `alpaca-bison-crude_session` (`userId`);