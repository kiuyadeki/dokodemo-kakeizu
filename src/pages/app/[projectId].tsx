import { FamilyTree } from "@/components/FamilyTree";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";


function AppPage( ){
  const router = useRouter();
  const { projectId } = router.query;
  console.log('projectId', projectId);

  return (
    <ChakraProvider>
      <ReactFlowProvider>
        <FamilyTree projectId={projectId} />
      </ReactFlowProvider>
    </ChakraProvider>
  )
};

export default AppPage;