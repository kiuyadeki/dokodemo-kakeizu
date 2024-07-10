import { createFamilyTree } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { ReactFlowJsonObject } from 'reactflow';

export const createNewFamilyTree = async (familyTreeData: ReactFlowJsonObject, projectName: string) => {
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
          name: projectName,
          data: JSON.stringify(familyTreeData),
        },
      },
    });
    console.log('create family tree', data);

    return data.data.createFamilyTree;
  } catch (error) {
    console.error('Error create family tree:', error);
  }
};
