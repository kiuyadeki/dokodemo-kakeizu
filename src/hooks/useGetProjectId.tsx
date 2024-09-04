import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetProjectId = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const queryProjectId = Array.isArray(router.query.projectId) ? router.query.projectId[0] : router.query.projectId;
    if (queryProjectId) {
      setProjectId(queryProjectId);
      setIsLoading(false);
    }
  }, [router.query]);

  return {projectId, isLoading: isLoading};
};