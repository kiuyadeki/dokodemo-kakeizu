import { FamilyTree } from '@/components/FamilyTree';
import { fetchFamilyTree } from '@/services/fetchFamilyTree';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { createGlobalStyle } from 'styled-components';

function AppPage() {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [familyTreeData, setFamilyTreeData] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const queryProjectId = Array.isArray(router.query.projectId) ? router.query.projectId[0] : router.query.projectId;
    if (queryProjectId) {
      console.log('queryProjectId', queryProjectId);
      setProjectId(queryProjectId);
    }
  }, [router.query]);

  useEffect(() => {
    if (projectId) {
      fetchFamilyTree(projectId).then((data) => {
        if (!data) return;
        setFamilyTreeData(data.data?.getFamilyTree?.data);
      });
    }
  }, [projectId]);


  const GlobalStyle = createGlobalStyle`
  .react-flow__node {
    transition: transform 0.4s ease-in-out;
  }
  `;

  return (
    <ChakraProvider>
      <GlobalStyle />
      <ReactFlowProvider>
        <FamilyTree projectId={projectId} familyTreeData={familyTreeData} />
      </ReactFlowProvider>
    </ChakraProvider>
  );
}

export default AppPage;
