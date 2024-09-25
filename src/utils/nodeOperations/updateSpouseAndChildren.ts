import { PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const updateSpouseAndChildren = (
  node: Node<PersonData>,
  spouseId: Node<PersonData>['id'],
  childId: Node<PersonData>['id'],
  maritalNodeId: string,
  maritalPosition: Node<PersonData>['data']['maritalPosition']
): Node<PersonData> => {
  const updatedSpouse = node.data.spouse.includes(spouseId) ? node.data.spouse : [...node.data.spouse, spouseId];
  const updatedChildren = node.data.children.includes(childId) ? node.data.children : [...node.data.children, childId];

  return {
    ...node,
    data: {
      ...node.data,
      spouse: updatedSpouse,
      children: updatedChildren,
      maritalNodeId,
      maritalPosition,
    },
  };
};
