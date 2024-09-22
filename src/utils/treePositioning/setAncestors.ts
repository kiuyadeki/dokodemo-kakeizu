import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { createNodeAncestorsCalculator } from "./createNodeAncestorsCalculator";

export const setAncestors = (wholeNodes: (PersonNodeType | MaritalNodeType)[]) => {
  const calculatedNodes = new Map<string, number[]>();
  const calculateNodeAncestors = createNodeAncestorsCalculator(wholeNodes, calculatedNodes);
  wholeNodes.forEach((node) => {
    if (node.type === 'person') {
      const maxParentsCount = calculateNodeAncestors(node.id);
      if ('ancestors' in node.data) node.data.ancestors = maxParentsCount.reduce((a, b) => a + b, 0);
    }
  });
};