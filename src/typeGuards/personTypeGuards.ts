import { Node } from 'reactflow';
import { PersonData } from '../types/PersonNodeData';

export const isPersonNodeData = function (node: Node | null): node is Node<PersonData> {
  if (!node || !node.data) return false;
  const data = node.data as Partial<PersonData>;
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
    'maritalPosition' in data &&
    'selected' in data
  );
};
