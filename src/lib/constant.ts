import { env } from "~/env";

export const HOME_DOMAIN = `https://${env.NEXT_PUBLIC_APP_DOMAIN}`;

export const ADMIN_HOSTNAMES = new Set([
	`admin.${env.NEXT_PUBLIC_APP_DOMAIN}`,
	"admin.localhost:3000",
]);

export const API_HOSTNAMES = new Set([
	`api.${env.NEXT_PUBLIC_APP_DOMAIN}`,
	"api.localhost:3000",
]);

export const APP_HOSTNAMES = new Set([
	`app.${env.NEXT_PUBLIC_APP_DOMAIN}`,
	"app.localhost:3000",
]);
