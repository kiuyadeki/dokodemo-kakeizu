import { Node } from 'reactflow';
import { PersonNodeData } from '../types/PersonNodeData';

export const isPersonNodeData = function (node: Node | null): node is PersonNodeData {
  if (!node) return false;
  return node.type === 'person' && 'data' in node && node.data != undefined;
};
