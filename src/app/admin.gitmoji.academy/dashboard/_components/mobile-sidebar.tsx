"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { NavItems } from "~/lib/data/nav-items";

import SideNav from "./side-nav";

const MobileSidebar = () => {
	const [open, setOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<div className="flex items-center justify-center gap-2">
						<HamburgerMenuIcon />
						<h1 className="text-lg font-semibold">T3 app template</h1>
					</div>
				</SheetTrigger>
				<SheetContent side="left" className="w-72">
					<div className="px-1 py-6 pt-16">
						<SideNav items={NavItems} setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default MobileSidebar;
