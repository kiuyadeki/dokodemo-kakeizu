import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { createNodeDescendantsCalculator } from './createNodeDescendantsCalculator';

export const setDescendants = (wholeNodes: (PersonNodeType | MaritalNodeType)[]) => {
  const calculatedNodes = new Map<string, number[]>();
  const calculatedNodeWidths = new Map<string, number[]>();
  const calculateNodeDescendants = createNodeDescendantsCalculator(wholeNodes, calculatedNodes, calculatedNodeWidths);

  wholeNodes.forEach((node) => {
    if (node.type === 'person') {
      const [descendantWidths] = calculateNodeDescendants(node.id);
      if ('descendantsWidth' in node.data) node.data.descendantsWidth = descendantWidths.reduce((a, b) => a + b, 0);
    }
  });
};
