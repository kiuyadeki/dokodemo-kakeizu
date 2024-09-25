import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { NodeData } from "@/types/NodeData";
import { Node } from "reactflow";

export const createNodeAncestorsCalculator = (
  wholeNodes: Node<NodeData>[],
  calculatedNodes: Map<string, number[]>
) => {
  const calculateNodeAncestors = (nodeId: string, ancestors: string[] = []): number[] => {
    if (calculatedNodes.has(nodeId)) {
      return calculatedNodes.get(nodeId)!;
    }
  
    const node = wholeNodes.find((node) => node.id === nodeId);
    if (!isPersonNodeType(node) || !node.data.parents.length) {
      return [1];
    }
  
    const parentCounts = node.data.parents.map((parentId) => {
      const counts = calculateNodeAncestors(parentId, [...ancestors, nodeId]);
      return counts;
    });
  
    const maxParentsCount = parentCounts.map((array) => array.reduce((a, b) => a + b, 0));
  
    calculatedNodes.set(nodeId, maxParentsCount);
    return maxParentsCount;
  };
  
  return calculateNodeAncestors;
}
