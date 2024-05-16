import { Container, Flex, Heading } from '@chakra-ui/react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { AgencyDetails } from '@/components/form/AgencyDetails';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/server-actions/user';
import { Plan } from '@/types/user.types';

export default async function AgencyPage({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) {
  const agencyId = await verifyAndAcceptInvitation();
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: page.tsx:11 ~ AgencyPage ~ agencyId:', agencyId);

  const userDetails = await getAuthUserDetails();
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: page.tsx:11 ~ AgencyPage ~ userDetails:', userDetails);

  if (agencyId) {
    if (userDetails?.role === 'SUBACCOUNT_GUEST' || userDetails?.role === 'SUBACCOUNT_USER') {
      return redirect('/subaccount');
    } else if (userDetails?.role === 'AGENCY_OWNER' || userDetails?.role === 'AGENCY_ADMIN') {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`);
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0];
        const stateAgencyId = searchParams.state.split('___')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`);
      } else {
        return redirect(`/agency/${agencyId}`);
      }
    } else {
      return <div>Not authorized</div>;
    }
  }

  const authUser = await currentUser();

  return (
    <Flex justifyContent={'center'} alignItems={'center'} mt={4}>
      <Container maxWidth={'850px'} border={'1px'} p={4} rounded={'xl'}>
        <Heading> Create An Agency</Heading>
        <AgencyDetails data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }} />
      </Container>
    </Flex>
  );
}
