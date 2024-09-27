import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData } from '@/types/NodeData';
import { BASE_MARITAL_SPACING, BASE_SIBLINGS_SPACING } from '../common/constants';
import { Node } from 'reactflow';

export const createNodeDescendantsCalculator = (
  wholeNodes: Node<NodeData>[],
  calculatedNodes: Map<string, number[]>,
  calculatedNodeWidths: Map<string, number[]>
) => {
  const calculateNodeDescendants = (nodeId: string, ancestors: string[] = []): [number[]] => {
    if (calculatedNodes.has(nodeId)) {
      return [calculatedNodeWidths.get(nodeId)!];
    }

    if (ancestors.includes(nodeId)) {
      return [[0]];
    }

    const node = wholeNodes.find((node) => node.id === nodeId);
    if (!isPersonNodeType(node)) return [[BASE_SIBLINGS_SPACING]];
    if (!node.data.children.length) {
      const defaultSpacing = node?.data?.spouse?.length
        ? BASE_MARITAL_SPACING * 2 + BASE_SIBLINGS_SPACING
        : BASE_SIBLINGS_SPACING;
      return [[defaultSpacing]];
    }

    let childWidths = node.data.children.map((childId) => {
      const [widths] = calculateNodeDescendants(childId, [...ancestors, nodeId]);
      return widths;
    });

    if (node.data.children.length === 1) {
      const childNode = wholeNodes.find((n) => n.id === node.data.children[0]);
      if (isPersonNodeType(childNode) && !childNode.data.spouse!.length) {
        childWidths = [[BASE_MARITAL_SPACING * 2 + BASE_SIBLINGS_SPACING]];
      }
    }

    const descendantWidths = childWidths.map((array) => array.reduce((a, b) => a + b, 0));
    calculatedNodeWidths.set(nodeId, descendantWidths);
    return [descendantWidths];
  };

  return calculateNodeDescendants;
};
