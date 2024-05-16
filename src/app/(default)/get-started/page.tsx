import { Stack } from '@chakra-ui/react';

import PageSubHeader from '@/components/core/nav/PageSubHeader';

function GetStartedPage() {
  return (
    <section>
      <Stack>
        <PageSubHeader heading="Get Started" />
        <div>GetStartedPage</div>
      </Stack>
    </section>
  );
}

export default GetStartedPage;
