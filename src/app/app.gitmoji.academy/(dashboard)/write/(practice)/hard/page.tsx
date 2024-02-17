import { Suspense } from "react";

import Points from "../../../points";
import Username from "../../../username";
import HardQuiz from "./hard-quiz";

const HardQuizPage = () => {
	return (
		<HardQuiz>
			<div className="mt-8 flex flex-col items-center">
				<Suspense fallback={<div>Loading...</div>}>
					<Points />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<Username />
				</Suspense>
			</div>
		</HardQuiz>
	);
};
export default HardQuizPage;
