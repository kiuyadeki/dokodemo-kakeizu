import { NodeData } from "@/types/NodeData";
import { createNodeAncestorsCalculator } from "./createNodeAncestorsCalculator";
import { Node } from "reactflow";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";

export const setAncestors = (wholeNodes: Node<NodeData>[]) => {
  const calculatedNodes = new Map<string, number[]>();
  const calculateNodeAncestors = createNodeAncestorsCalculator(wholeNodes, calculatedNodes);
  wholeNodes.forEach((node) => {
    if (isPersonNodeType(node)) {
      const maxParentsCount = calculateNodeAncestors(node.id);
      if ('ancestors' in node.data) node.data.ancestors = maxParentsCount.reduce((a, b) => a + b, 0);
    }
  });
};