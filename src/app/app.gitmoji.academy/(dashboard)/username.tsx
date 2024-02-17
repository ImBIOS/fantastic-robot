import { auth } from "~/server/auth";

const Username = async () => {
	const session = await auth();
	return <div>{session?.user.email}</div>;
};

export default Username;
