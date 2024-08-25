import { Node } from 'reactflow';
import { PersonNodeType } from '@/types/PersonNodeType';

export const isPersonNodeType = function (node: Node | null | undefined): node is PersonNodeType {
  if (!node || !node.data) return false;
  const data = node.data;
  return (
    node.type === 'person' &&
    'label' in data &&
    'parents' in data &&
    'children' in data &&
    'spouse' in data &&
    'siblings' in data &&
    'descendants' in data &&
    'descendantsWidth' in data &&
    'ancestors' in data &&
    'selected' in data
  );
};
