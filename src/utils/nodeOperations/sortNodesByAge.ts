import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData, PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const sortNodesByAge = (nodes: Node<NodeData>[]) => {
  const sortedNodes = nodes.sort((a, b) => {
    const getAge = (node: Node<PersonData>) => {
      const birthDay = node.data.birthDay;
      return birthDay ? new Date().getTime() - new Date(birthDay).getTime() : -Infinity;
    };
    if (!isPersonNodeType(a) || !isPersonNodeType(b)) return 0;
    const ageA = getAge(a);
    const ageB = getAge(b);

    if (ageA !== undefined && ageB === undefined) return -1;
    if (ageA === undefined && ageB !== undefined) return 1;

    if (ageA !== undefined && ageB !== undefined) {
      return ageB - ageA;
    }

    return b.data.createdAt - a.data.createdAt;
  });

  return sortedNodes;
};
