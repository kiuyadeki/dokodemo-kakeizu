import { FamilyTree } from "@/components/FamilyTree";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


function AppPage( ){
  const router = useRouter();
  const { projectId } = router.query;
  console.log('projectId', projectId);

  return (
    <ChakraProvider>
      <FamilyTree projectId={projectId} />
    </ChakraProvider>
  )
};

export default AppPage;