import { FamilyTree } from "@/components/FamilyTree";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { createGlobalStyle } from "styled-components";


function AppPage( ){
  const router = useRouter();
  const { projectId } = router.query;
  console.log('projectId', projectId);

  const GlobalStyle = createGlobalStyle`
  .react-flow__node {
    transition: transform 0.4s ease-in-out;
  }
`;

  return (
    <ChakraProvider>
      <GlobalStyle />
      <ReactFlowProvider>
        <FamilyTree projectId={projectId} />
      </ReactFlowProvider>
    </ChakraProvider>
  )
};

export default AppPage;