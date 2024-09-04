import { getFamilyTree } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';

export const fetchFamilyTree = async (id: string | undefined) => {
  const client = generateClient();
  const user = await fetchUserAttributes();

  try {
    if (!id) {
      throw new Error('Project ID not found');
    }
    if (!user.sub) {
      throw new Error('User not found');
    }

    const familfyTreeData = await client.graphql({
      query: getFamilyTree,
      variables: {
        id: id,
        // id: 'cd45814f-3caa-450c-a6a4-3934257f91e2',
      },
    });
    return familfyTreeData;
  } catch (error) {
    console.error('Error fetching family tree:', error);
  }
};
