import { PersonNodeType } from '@/types/PersonNodeType';

export const updateSpouseAndChildren = (
  node: PersonNodeType,
  spouseId: PersonNodeType['id'],
  childId: PersonNodeType['id'],
  maritalNodeId: string,
  maritalPosition: PersonNodeType['data']['maritalPosition']
): PersonNodeType => {
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
