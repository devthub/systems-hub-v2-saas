'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Heading, HStack, IconButton, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdAdd, MdKeyboardBackspace } from 'react-icons/md';

export interface IPageSubHeaderProps {
  heading?: string | undefined;
  actionLabel?: string | undefined;
  actionLinkTo?: string | undefined;
}

const PageSubHeader = ({ heading, actionLabel, actionLinkTo }: IPageSubHeaderProps) => {
  const router = useRouter();

  return (
    <Flex alignItems="center" justifyContent={{ base: 'space-between', lg: 'flex-start' }}>
      <HStack spacing={8}>
        <IconButton
          icon={<MdKeyboardBackspace />}
          variant={'ghost'}
          aria-label="Back to previous page"
          fontSize={'2xl'}
          onClick={() => router.back()}
        />

        <Heading as={'h2'} fontSize={{ base: 'lg', lg: '2xl' }}>
          {heading}
        </Heading>
      </HStack>

      <Spacer />

      {actionLabel && actionLinkTo && (
        <Button as={Link} href={actionLinkTo} variant={'outline'} colorScheme="green" leftIcon={<MdAdd />} size="sm">
          {actionLabel}
        </Button>
      )}
    </Flex>
  );
};

export default PageSubHeader;
