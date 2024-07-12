import { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { Box, Button, Center, ChakraBaseProvider, ChakraProvider, Container, Heading, Text, extendTheme } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { UseMicroModal } from '@/hooks/useMicromodal';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { fetchFamilyTreeSummary } from '@/utils/fetchFamilyTreeSummary';
import { fail } from 'assert';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

const HomePage = ({ signOut, user }: WithAuthenticatorProps) => {
  const { Modal, open, close } = UseMicroModal('create-family-tree-modal');
  const [familyTreeSummary, setFamilyTreeSummary] = useState<any>([]);
  const fetchData = async () => {
    const result = await fetchFamilyTreeSummary();
    if (result) {
      setFamilyTreeSummary(result);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Center minHeight='100dvh' p={10}>
        <Container maxW='3xl' bg='white' p={10} borderRadius='md' shadow='md' position='relative'>
          <Box pb={8}>
            <Heading as='h2' size='md' mb={4}>
              編集する家系図を選択してください。
            </Heading>
            {familyTreeSummary.map((tree: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                <Button key={tree.id}>{tree.name}</Button>
            ))}
          </Box>


          <Text mb={6}>または</Text>
          <Button onClick={open}>新しく家系図を作る</Button>
            <Modal>
              <CreateProjectModal />
            </Modal>

          <Button onClick={signOut}>Sign Out {user!.username}</Button>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default HomePage;
