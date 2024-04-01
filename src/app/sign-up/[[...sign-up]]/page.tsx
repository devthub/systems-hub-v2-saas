import { Container } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <Container maxW={'3xl'} centerContent height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <SignUp />
    </Container>
  );
}
