import { PersonData } from '@/types/NodeData';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { Node } from 'reactflow';

export const updateNodeData = (data: ProfileEditorInputs, node: Node<PersonData>): Promise<Node<PersonData>> => {
  const updatedNode = {
    ...node,
    data: {
      ...node.data,
      ...data,
    },
  };
  return new Promise(function (resolve) {
    resolve(updatedNode);
  });
};
