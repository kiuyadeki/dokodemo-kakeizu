import { createFamilyTree } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';

export const createNewFamilyTree = async (familyTreeData: object) => {
  const client = generateClient();
  const user = await fetchUserAttributes();

  try {
    if (!user.sub) {
      throw new Error('User not found');
    }
    const data = await client.graphql({
      query: createFamilyTree,
      variables: {
        input: {
          owner: user.sub,
          data: JSON.stringify(familyTreeData),
        },
      },
    });

    return data.data.createFamilyTree;
  } catch (error) {
    console.error('Error create family tree:', error);
  }
};
