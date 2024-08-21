import { fetchFamilyTree } from '@/services/fetchFamilyTree';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useFetchFamilyTreeData = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [familyTreeData, setFamilyTreeData] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const queryProjectId = Array.isArray(router.query.projectId) ? router.query.projectId[0] : router.query.projectId;
    if (queryProjectId) {
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

  return {familyTreeData, projectId};
};
