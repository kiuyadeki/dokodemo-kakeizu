import { Edge, Node } from 'reactflow';
import { PersonData } from '@/types/NodeData';

function extractEdgesFromNode(wholeEdges: Edge[], selectedNode: Node<PersonData> | undefined) {
  if (selectedNode && Array.isArray(wholeEdges)) {
    return wholeEdges.filter((e) => e.source === selectedNode.id);
  } else {
    return [];
  }
}

export default extractEdgesFromNode;
