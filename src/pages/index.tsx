import { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  extendTheme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CreateNewProject } from '@/components/CreateNewProject';
import { fetchFamilyTreeSummary } from '@/services/fetchFamilyTreeSummary';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const result = await fetchFamilyTreeSummary();
    if (result) {
      setFamilyTreeSummary(result);
    }
  };

  const handleButtonClick = async (href: string) => {
    setLoading(true);
    try {
      await router.push(href);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>家系図一覧</title>
        <meta
          property="description"
          content="家系図の一覧です。"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Center
          minHeight="100dvh"
          p={10}
        >
          {loading ? (
            <VStack>
              <CircularProgress
                isIndeterminate
                color="blue.600"
              />
              <Text mt={3}>家系図を読み込んでいます。</Text>
            </VStack>
          ) : (
            <Container
              maxW="3xl"
              bg="white"
              p={10}
              borderRadius="md"
              shadow="md"
              position="relative"
            >
              <Box>
                <Heading
                  as="h2"
                  size="md"
                  mb={5}
                >
                  編集する家系図を選択してください。
                </Heading>

                <Flex
                  columnGap={6}
                  rowGap={4}
                  wrap="wrap"
                >
                  {familyTreeSummary.map((tree: { id: string; name: string }) => (
                    <Button
                      key={tree.id}
                      onClick={() => handleButtonClick(`/app/${tree.id}`)}
                    >
                      {tree.name}
                    </Button>
                  ))}
                </Flex>
              </Box>

              <Text py={12}>または</Text>
              <Heading
                as="h2"
                size="md"
                mb={5}
              >
                新しく家系図を作る
              </Heading>
              <CreateNewProject />

              <Button onClick={signOut}>Sign Out {user!.username}</Button>
            </Container>
          )}
        </Center>
      </ChakraProvider>
    </>
  );
};

export default HomePage;
