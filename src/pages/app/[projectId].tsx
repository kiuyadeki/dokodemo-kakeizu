import { FamilyTree } from '@/components/FamilyTree';
import { useFetchFamilyTreeData } from '@/hooks/useFetchFamilyTreeData';
import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { createGlobalStyle } from 'styled-components';

function AppPage() {
  const { familyTreeData, projectId } = useFetchFamilyTreeData();

  const GlobalStyle = createGlobalStyle`
  .react-flow__node {
    transition: transform 0.4s ease-in-out;
  }
  `;

  return (
    <ChakraProvider>
      <GlobalStyle />
      <ReactFlowProvider>
        {!familyTreeData ? (
          <Center minHeight="100vh">
            <Spinner size="lg" />
          </Center>
        ) : (
          <FamilyTree projectId={projectId} familyTreeData={familyTreeData} />
        )
        }
      </ReactFlowProvider>
    </ChakraProvider>
  );
}

export default AppPage;
