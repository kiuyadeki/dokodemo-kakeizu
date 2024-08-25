import { Edge } from 'reactflow';
import { PersonNodeType } from '@/types/PersonNodeType';

function extractEdgesFromNode(wholeEdges: Edge[], selectedNode: PersonNodeType | undefined) {
  if (selectedNode && Array.isArray(wholeEdges)) {
    return wholeEdges.filter((e) => e.source === selectedNode.id);
  } else {
    return [];
  }
}

export default extractEdgesFromNode;
