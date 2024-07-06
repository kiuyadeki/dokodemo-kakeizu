import { listFamilyTrees } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { fetchUserAttributes } from "aws-amplify/auth";

export const fetchFamilyTree = async (familyTreeData: object) => {
  const client = generateClient();
  const user = await fetchUserAttributes();

  try {
    if (!user.sub) {
      throw new Error('User not found');
    }

    const familfyTreeData = await client.graphql({
      query: listFamilyTrees,
    });
    const familyTrees = familfyTreeData.data.listFamilyTrees.items;
    console.log('familyTrees', familyTrees);
  } catch(error) {
    console.error('Error fetching family tree:', error)
  }
}