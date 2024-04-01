import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function AgencyPage() {
  const authUser = await currentUser();
  if (!authUser) return redirect('sign-in');

  return <div>AgencyPage</div>;
}

export default AgencyPage;
