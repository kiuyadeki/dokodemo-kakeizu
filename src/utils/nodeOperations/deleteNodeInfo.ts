import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData, PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const deleteNodeInfo = (
  nodeList: Node<NodeData>[],
  selectedNode: Node<PersonData> | undefined
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
