import { FamilyTree } from '@/components/FamilyTree';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .react-flow__node {
    transition: transform 0.4s ease-in-out;
  }
  `;
  
function AppPage() {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider>
        <ReactFlowProvider>
          <FamilyTree />
        </ReactFlowProvider>
      </ChakraProvider>
    </>
  );
}

export default AppPage;
