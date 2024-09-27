import { PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const updateChildren = (node: Node<PersonData>, childId: string): Node<PersonData> => ({
  ...node,
  data: { ...node.data, children: [...node.data.children, childId] },
});
