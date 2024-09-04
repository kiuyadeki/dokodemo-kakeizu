import { PersonNodeType } from '@/types/PersonNodeType';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';

export const updateNodeData = (data: ProfileEditorInputs, node: PersonNodeType): Promise<PersonNodeType> => {
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
