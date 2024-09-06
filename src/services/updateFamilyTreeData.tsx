import { updateFamilyTree } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

export const updateFamilyTreeData = async (familyTreeData: string, projectId: string) => {
  const client = generateClient();

  try {
    const updatedData = await client.graphql({
      query: updateFamilyTree,
      variables: {
        input: {
          id: projectId,
          data: familyTreeData,
        },
      },
    });

    console.log(updatedData);
    return { success: true };
  } catch (error) {
    console.error('Error updating family tree: ', error);
    return { success: false };
  }
};
