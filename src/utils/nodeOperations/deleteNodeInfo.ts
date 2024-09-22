import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';

export const deleteNodeInfo = (
  nodeList: (PersonNodeType | MaritalNodeType)[],
  selectedNode: PersonNodeType | undefined
) => {
  if (!isPersonNodeType(selectedNode)) return nodeList;

  const nodesCopy = [...nodeList];
  const newNodeList = nodesCopy.map((node) => {
    if (isPersonNodeType(node) && node.id === selectedNode.id) {
      return {
        ...node,
        data: {
          ...node.data,
          birthDay: undefined,
          deathDay: undefined,
          gender: undefined,
          profilePictureURL: undefined,
          firstName: '',
          lastName: '',
          label: '',
        },
      };
    }
    return node;
  });
  return newNodeList;
};
