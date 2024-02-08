import { auth } from '~/server/auth';

import { Featurebase } from './featurebase';
import { Button } from './ui/button';

export const FeaturebaseWrapper = async () => {
  const session = await auth();
  return (
    <Featurebase session={session}>
      <a href="https://fantastic-robot.featurebase.app" target="_blank">
        <Button size="sm" variant="outline">
          Send Feedback
        </Button>
      </a>
    </Featurebase>
  );
};
