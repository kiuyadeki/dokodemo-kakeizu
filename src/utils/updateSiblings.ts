import { PersonNodeType } from '@/types/PersonNodeType';

export const updateSiblings = (node: PersonNodeType, siblings: string[], childId: string): PersonNodeType => ({
  ...node,
  data: { ...node.data, siblings: [...siblings, childId] },
});
