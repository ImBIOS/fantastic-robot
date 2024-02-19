import { Suspense } from "react";
import { SpinnerIcon } from "~/components/icons";
import { APP_NAME } from "~/lib/constant";
import SAMLIDPForm from "./form";

export default function SAMLPage() {
	return (
		<div>
			<Suspense>
				<SAMLIDPForm />
			</Suspense>
			<div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
				<h1 className="font-display text-4xl font-bold">Authenticating</h1>
				<p className="text-lg text-gray-600">
					{APP_NAME} is verifying your identity.
					<br /> Please wait...
				</p>
				<SpinnerIcon className="size-7" />
			</div>
		</div>
	);
}
