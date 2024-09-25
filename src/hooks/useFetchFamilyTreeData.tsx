import { fetchFamilyTree } from '@/services/fetchFamilyTree';
import { useEffect, useState } from 'react';

export const useFetchFamilyTreeData = (id: string | undefined) => {
  const [familyTreeData, setFamilyTreeData] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      fetchFamilyTree(id).then((data) => {
        if (!data) return;
        setFamilyTreeData(data.data?.getFamilyTree?.data);
      });
    }
  }, [id]);

  return { familyTreeData, id };
};
