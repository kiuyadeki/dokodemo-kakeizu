import { FamilyTree as FamilyTreeType } from '@/API';
import { FamilyTree } from '@/components/FamilyTree';
import { fetchFamilyTreeSummary } from '@/services/fetchFamilyTreeSummary';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .react-flow__node {
    transition: transform 0.4s ease-in-out;
  }
  `;

const AppPage = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState<any>([]);
  const fetchData = async () => {
    const result = await fetchFamilyTreeSummary();
    if (result) {
      return result;
    }
    return [];
  };

  useEffect(() => {
    fetchData().then((res) => {
      res.find((item: FamilyTreeType) => {
        if (item.id === router.query.projectId) {
          setProjectName(item.name);
        }
      });
    });
  }, [router.query.projectId]);

  return (
    <>
      <Head>
        <title>{projectName} - 家系図</title>
        <meta
          property="description"
          content={`${projectName}の家系図データです。`}
        />
      </Head>
      <GlobalStyle />
      <ChakraProvider>
        <ReactFlowProvider>
          <FamilyTree />
        </ReactFlowProvider>
      </ChakraProvider>
    </>
  );
};

export default AppPage;
