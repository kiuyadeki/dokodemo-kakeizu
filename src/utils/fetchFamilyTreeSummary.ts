import { listFamilyTreeSummary } from "@/graphql/customQueries";
import { generateClient } from "aws-amplify/api"
import { fetchUserAttributes } from "aws-amplify/auth";

export const fetchFamilyTreeSummary = async () => {
  const client = generateClient();

  try {

    const familfyTreeSummaryData = await client.graphql({
      query: listFamilyTreeSummary,
    });
    console.log(familfyTreeSummaryData);
    return familfyTreeSummaryData.data.listFamilyTrees.items;
  } catch (error) {
    console.error('Error fetching summary data: ', error);
  }
}