import { PersonNodeType } from "@/types/PersonNodeType";

export const updateSpouseAndChildren = (node: PersonNodeType, spouseId: PersonNodeType['id'], childId: PersonNodeType['id'], maritalNodeId: string, maritalPosition: PersonNodeType['data']['maritalPosition']): PersonNodeType => ({
  ...node,
  data: {
    ...node.data,
    spouse: [...node.data.spouse, spouseId],
    children: [...node.data.children, childId],
    maritalNodeId,
    maritalPosition,
  },
});