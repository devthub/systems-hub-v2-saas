import { Flex, Stack } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <SignUp />
        </Stack>
      </Flex>

      <Flex
        display={{ base: 'none', md: 'flex' }}
        flex={1}
        justify="center"
        align="center"
        bg="#3182CE"
        borderBottomLeftRadius={'400px'}
        bgGradient={['linear(to-r, #54BFE9, #3182CE)']}
        shadow={'xl'}
      >
        <Image
          src={'/assets/img/systems-hub-logo-1207x421.webp'}
          width={300}
          height={210}
          alt="Systems Hub Logo"
          blurDataURL="/assets/img/systems-hub-logo-1207x421.webp"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </Flex>
    </Stack>
  );
}
