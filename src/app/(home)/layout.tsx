const HomeLayout = ({
	children,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) => {
	return (
		<>
			{/* <AnnouncementBar /> */}
			{children}
		</>
	);
};

export default HomeLayout;
