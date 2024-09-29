import { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  CheckboxIcon,
  CircularProgress,
  Container,
  Flex,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Spinner,
  Text,
  VStack,
  background,
  extendTheme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CreateNewProject } from '@/components/CreateNewProject';
import { fetchFamilyTreeSummary } from '@/services/fetchFamilyTreeSummary';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { formatDate } from '@/helpers/formatDate';
import { EditIcon } from '@chakra-ui/icons';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: 'url(/pattern.jpg)',
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

const HomePage = ({ signOut, user }: WithAuthenticatorProps) => {
  const [familyTreeSummary, setFamilyTreeSummary] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoadingSummary(true);
    try {
      const result = await fetchFamilyTreeSummary();
      if (result) {
        setFamilyTreeSummary(result);
      }
    } finally {
      setLoadingSummary(false);
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
          py={20}
          px={6}
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
                  mb={8}
                >
                  編集する家系図を選択してください。
                </Heading>

                <Flex
                  columnGap={6}
                  rowGap={4}
                  wrap="wrap"
                >
                  {loadingSummary ? (
                    <Center w="100%">
                      <CircularProgress
                      isIndeterminate
                      color="blue.600"
                    />
                    </Center>
                  ) : (
                    <List spacing={0} w="100%" borderTop="1px solid" borderColor="gray.200">

                      {familyTreeSummary.map((tree: { id: string; name: string; createdAt: string; }) => (
                        <ListItem
                          key={tree.id}
                          onClick={() => handleButtonClick(`/app/${tree.id}`)}
                          display="flex"
                          alignItems="center"
                          cursor="pointer"
                          py={4}
                          borderBottom="1px solid"
                          borderColor="gray.200"
                          transition="opacity 0.3s"
                          _hover={{ opacity: 0.5 }}
                          aria-label={`Edit ${tree.name}`}
                        >
                          <ListIcon as={EditIcon} color='#aaa' />
                          <Flex flex="1" alignItems="baseline">
                          <Text fontSize="md" color="gray.800">{tree.name}</Text>
                          <Spacer />
                          <Text fontSize="sm" color="gray.500">作成日: {formatDate(tree.createdAt)}</Text>
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  )
                }
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

              <Text fontWeight="600" position="fixed" left="20px" top="10px">{user!.username}</Text>
              <Flex justifyContent="flex-end">
              <Button mt={8} onClick={signOut}>ログアウト</Button>
              </Flex>
            </Container>
          )}
        </Center>
      </ChakraProvider>
    </>
  );
};

export default HomePage;
