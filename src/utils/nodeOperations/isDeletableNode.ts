import { NodeData } from '@/types/NodeData';
import { Edge, Node } from 'reactflow';
import extractEdgesFromNode from './extractEdgesFromNode';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';

export const isDeletableNode = (edgeList: Edge[], node: Node<NodeData> | undefined) => {
  if (!isPersonNodeType(node)) return false;
  const outgoingEdges = extractEdgesFromNode(edgeList, node);
  if (outgoingEdges.length <= 1 && node.data.children.length === 0) {
    return true;
  }
  return false;
};
