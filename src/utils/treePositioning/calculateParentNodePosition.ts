import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_NODE_HEIGHT, BASE_MARITAL_NODE_WIDTH, BASE_MARITAL_SPACING, BASE_PARENTS_GAP, BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from "../common/constants";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";

export const calculateParentNodePosition = (
  wholeNodes: (PersonNodeType | MaritalNodeType)[],
  node: PersonNodeType | MaritalNodeType,
  selectedNode: PersonNodeType,
  level: number,
  offsetX: number,
  ancestorsSide: 'left' | 'right' | ''
) => {
  if (!node || !selectedNode) return;
  node.position.y = -level * BASE_GENERATIONS_SPACING;
  if (isPersonNodeType(node)) {
    const nodeMaritalPosition = node.data.maritalPosition;
    let parentOffset = node.data.ancestors || 0 * BASE_MARITAL_SPACING;

    switch (ancestorsSide) {
      case 'left':
        const rightParentNode = wholeNodes.find(
          (parentNode) =>
            isPersonNodeType(parentNode) &&
            node.data.parents?.includes(parentNode.id) &&
            parentNode.data.maritalPosition === 'right'
        )
        if (isPersonNodeType(rightParentNode)) {
          parentOffset =
            -rightParentNode.data.ancestors * BASE_MARITAL_SPACING -
            (rightParentNode.data.ancestors - 1) * BASE_PARENTS_GAP;
        }
        break;
      case 'right':
        const leftParentNode = wholeNodes.find(
          (parentNode) =>
            isPersonNodeType(parentNode) &&
            node.data.parents?.includes(parentNode.id) &&
            parentNode.data.maritalPosition === 'left'
        );
        if (isPersonNodeType(leftParentNode)) {
          parentOffset =
            leftParentNode.data.ancestors * BASE_MARITAL_SPACING +
            (leftParentNode.data.ancestors - 1) * BASE_PARENTS_GAP;
        }
        break;
      default:
    }

    if (!(node.id === selectedNode.id)) {
      switch (nodeMaritalPosition) {
        case 'left':
          node.position.x = offsetX - BASE_MARITAL_SPACING;
          break;
        case 'right':
          node.position.x = offsetX + BASE_MARITAL_SPACING;
          break;
        default:
      }

      // maritalノードの位置計算
      if (node.data.maritalNodeId) {
        const maritalNode = wholeNodes.find((n) => n.id === node.data.maritalNodeId);
        if (maritalNode) {
          maritalNode.position.y = node.position.y + (BASE_PERSON_NODE_HEIGHT - BASE_MARITAL_NODE_HEIGHT) / 2;
          switch (nodeMaritalPosition) {
            case 'left':
              maritalNode.position.x =
                node.position.x + BASE_MARITAL_SPACING + (BASE_PERSON_NODE_WIDTH - BASE_MARITAL_NODE_WIDTH) / 2;
              break;
            case 'right':
              maritalNode.position.x =
                node.position.x - BASE_MARITAL_SPACING + (BASE_PERSON_NODE_WIDTH - BASE_MARITAL_NODE_WIDTH) / 2;
              break;
            default:
          }
        }
      }
    }

    node.data.parents?.forEach((parentId) => {
      const parentNode = wholeNodes.find((n) => n.id === parentId);
      if (isPersonNodeType(node) && isPersonNodeType(parentNode) && node.id === selectedNode.id && parentNode?.data?.maritalPosition) {
        if (parentNode.data.maritalPosition === 'left') {
          calculateParentNodePosition(
            wholeNodes,
            parentNode,
            node,
            level + 1,
            node.position.x,
            parentNode.data.maritalPosition
          );
        } else if (parentNode.data.maritalPosition === 'right') {
          calculateParentNodePosition(
            wholeNodes,
            parentNode,
            node,
            level + 1,
            node.position.x,
            parentNode.data.maritalPosition
          );
        }
      } else if (isPersonNodeType(parentNode) && parentNode.data.maritalPosition && isPersonNodeType(node)) {
        calculateParentNodePosition(
          wholeNodes,
          parentNode,
          node,
          level + 1,
          node.position.x + parentOffset,
          parentNode.data.maritalPosition
        );
      }
    });
  }
};