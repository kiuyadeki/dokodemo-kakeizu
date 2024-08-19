import { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { Box, Button, Center, ChakraBaseProvider, ChakraProvider, Container, Flex, Heading, Text, extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CreateNewProject } from '@/components/CreateNewProject';
import { fetchFamilyTreeSummary } from '@/services/fetchFamilyTreeSummary';

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
  const [familyTreeSummary, setFamilyTreeSummary] = useState<any>([]);

  const fetchData = async () => {
    const result = await fetchFamilyTreeSummary();
    if (result) {
      setFamilyTreeSummary(result);
      console.log(result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Center minHeight='100dvh' p={10}>
        <Container maxW='3xl' bg='white' p={10} borderRadius='md' shadow='md' position='relative'>
          <Box>
            <Heading as='h2' size='md' mb={5}>
              編集する家系図を選択してください。
            </Heading>

            <Flex columnGap={6} rowGap={4} wrap='wrap'>
              {familyTreeSummary.map((tree: { id: string; name: string }) => (
                <Link key={tree.id} href={`/app/${tree.id}`} passHref>
                  <Button>{tree.name}</Button>
                </Link>
              ))}
            </Flex>
          </Box>

          <Text py={12}>または</Text>
          <Heading as='h2' size='md' mb={5}>
            新しく家系図を作る
          </Heading>
          <CreateNewProject />

          <Button onClick={signOut}>Sign Out {user!.username}</Button>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default HomePage;
