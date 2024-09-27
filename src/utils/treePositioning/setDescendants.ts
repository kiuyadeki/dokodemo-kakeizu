import { NodeData } from '@/types/NodeData';
import { createNodeDescendantsCalculator } from './createNodeDescendantsCalculator';
import { Node } from 'reactflow';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';

export const setDescendants = (wholeNodes: Node<NodeData>[]) => {
  const calculatedNodes = new Map<string, number[]>();
  const calculatedNodeWidths = new Map<string, number[]>();
  const calculateNodeDescendants = createNodeDescendantsCalculator(wholeNodes, calculatedNodes, calculatedNodeWidths);

  wholeNodes.forEach((node) => {
    if (isPersonNodeType(node)) {
      const [descendantWidths] = calculateNodeDescendants(node.id);
      if ('descendantsWidth' in node.data) node.data.descendantsWidth = descendantWidths.reduce((a, b) => a + b, 0);
    }
  });
};
