"use client";

import type { JSX, SVGProps } from "react";
import { cn } from "~/lib/utils";

function DiscordIcon({
	className,
	...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-label="Discord Icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 127.14 96.36"
			role="img"
			fill="currentColor"
			className={cn("size-4", className)}
			{...props}
		>
			<g id="图层_2" data-name="图层 2">
				<g id="Discord_Logos" data-name="Discord Logos">
					<g
						id="Discord_Logo_-_Large_-_White"
						data-name="Discord Logo - Large - White"
					>
						<path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
					</g>
				</g>
			</g>
		</svg>
	);
}

function GoogleIcon({
	className,
	...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-label="Google Icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			role="img"
			fill="currentColor"
			className={cn("size-4", className)}
			{...props}
		>
			<path
				fill="#fbc02d"
				d="M44,24c0-1.31-0.11-2.58-0.32-3.83H24v7.25h11.84c-0.48,2.54-1.94,4.71-3.94,6.17v5.13h6.37c3.73-3.44,5.88-8.51,5.88-14.72Z"
			/>
			<path
				fill="#e53935"
				d="M24,48c6.48,0,11.93-2.14,15.91-5.8l-6.37-5.13c-2.15,1.44-4.89,2.3-7.89,2.3-6.07,0-11.21-4.11-13.05-9.64H4.18v6.07C8.17,43.95,15.46,48,24,48Z"
			/>
			<path
				fill="#4caf50"
				d="M10.96,28.83c-0.25-0.75-0.38-1.55-0.38-2.38s0.13-1.63,0.38-2.38V17.99H4.18C3.42,19.64,3,21.48,3,23.45s0.42,3.81,1.18,5.46L10.96,28.83Z"
			/>
			<path
				fill="#1565c0"
				d="M24,9.58c3.25,0,6.18,1.12,8.48,3.32l6.36-6.36C35.93,2.14,30.48,0,24,0C15.46,0,8.17,4.05,4.18,10.13l6.78,5.84C12.79,13.69,17.93,9.58,24,9.58Z"
			/>
		</svg>
	);
}

function SpinnerIcon({
	className,
	...props
}: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-label="Spinner Icon"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn("size-4 animate-spin", className)}
			{...props}
		>
			<path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
		</svg>
	);
}

function DribbbleIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			{...props}
			aria-label="Dribbble Icon"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
			<path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
			<path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
		</svg>
	);
}

function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			role="img"
			aria-label="Flag Icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
			<line x1="4" x2="4" y1="22" y2="15" />
		</svg>
	);
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			role="img"
			aria-label="Github Icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			role="img"
			aria-label="Twitter Icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}

export {
	DiscordIcon,
	DribbbleIcon,
	FlagIcon,
	GithubIcon,
	GoogleIcon,
	SpinnerIcon,
	TwitterIcon,
};
