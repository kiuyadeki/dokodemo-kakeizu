import { PersonNodeType } from '@/types/PersonNodeType';

export const updateChildren = (node: PersonNodeType, childId: string): PersonNodeType => ({
  ...node,
  data: { ...node.data, children: [...node.data.children, childId] },
});
