import { getFamilyTree } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';

export const fetchFamilyTree = async () => {
  const client = generateClient();
  const user = await fetchUserAttributes();

  try {
    if (!user.sub) {
      throw new Error('User not found');
    }

    const familfyTreeData = await client.graphql({
      query: getFamilyTree,
      variables: {
        id: 'cd45814f-3caa-450c-a6a4-3934257f91e2',
      },
    });
    const familyTrees = familfyTreeData;
    console.log('familyTrees', familfyTreeData);
  } catch (error) {
    console.error('Error fetching family tree:', error);
  }
};
