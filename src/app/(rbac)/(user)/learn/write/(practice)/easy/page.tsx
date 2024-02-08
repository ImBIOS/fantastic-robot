import { Suspense } from 'react';

import Points from '../../../points';
import Username from '../../../username';
import EasyQuiz from './easy-quiz';

const EasyQuizPage = () => {
  return (
    <EasyQuiz>
      <div className="mt-8 flex flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Points />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Username />
        </Suspense>
      </div>
    </EasyQuiz>
  );
};

export default EasyQuizPage;
