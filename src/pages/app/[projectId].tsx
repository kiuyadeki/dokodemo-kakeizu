import { FamilyTree } from "@/components/FamilyTree";
import { useRouter } from "next/router";
import { useEffect } from "react";


function AppPage( ){
  const router = useRouter();
  const { projectId } = router.query;
  console.log('projectId', projectId);

  return (
      <FamilyTree projectId={projectId} />
  )
};

export default AppPage;