'use client';

import { Agency } from '@/types/agency.types';

type Props = {
  data: Partial<Agency>;
};

export const AgencyDetails = ({ data }: Props) => {
  // eslint-disable-next-line no-console
  console.log('data', data);
  return <div>AgencyDetails</div>;
};
