import { PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const updateSiblings = (node: Node<PersonData>, siblings: string[], childId: string): Node<PersonData> => ({
  ...node,
  data: { ...node.data, siblings: [...siblings, childId] },
});
