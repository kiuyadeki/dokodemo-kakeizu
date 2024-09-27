import { NodeData } from "@/types/NodeData";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_NODE_HEIGHT, BASE_MARITAL_NODE_WIDTH, BASE_MARITAL_SPACING, BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH, BASE_SIBLINGS_SPACING } from "../common/constants";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { sortNodesByAge } from "../nodeOperations/sortNodesByAge";
import { Node } from "reactflow";

export const calculateChildNodePosition = (
  wholeNodes: Node<NodeData>[],
  node: Node<NodeData>,
  level: number,
  offsetX: number
) => {
  if (!node) return;
  node.position.y = level * BASE_GENERATIONS_SPACING;
  if (isPersonNodeType(node)) {
    const nodeDescendantsWidth = node.data.descendantsWidth || 0;
    const nodeMaritalPosition = node.data.maritalPosition;

    switch (nodeMaritalPosition) {
      case 'left':
        node.position.x = offsetX + (nodeDescendantsWidth - BASE_SIBLINGS_SPACING) / 2 - BASE_MARITAL_SPACING;
        break;
      case 'right':
        node.position.x = offsetX + (nodeDescendantsWidth - BASE_SIBLINGS_SPACING) / 2 + BASE_MARITAL_SPACING;
        break;
      default:
        if (!node.data.siblings?.length || node.data.siblings.length <= 1) {
          node.position.x = offsetX + BASE_MARITAL_SPACING;
        } else {
          node.position.x = offsetX;
        }
    }
    // 配偶者の位置計算
    node.data.spouse.forEach((spouseId) => {
      if (spouseId === node.id) return;
      const spouseNode = wholeNodes.find((n) => n.id === spouseId);
      if (spouseNode) {
        switch (nodeMaritalPosition) {
          case 'left':
            spouseNode.position.x = node.position.x + BASE_MARITAL_SPACING * 2;
            break;
          case 'right':
            spouseNode.position.x = node.position.x - BASE_MARITAL_SPACING * 2;
            break;
          default:
        }
        spouseNode.position.y = node.position.y;
      }
    });

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

    // 子供の位置計算
    let cumulativeOffset = offsetX;
    const childrenNodes = wholeNodes.filter((n) => node.data.children.includes(n.id));
    const sortedChildrenNodes = sortNodesByAge(childrenNodes);
    sortedChildrenNodes.forEach((childNode) => {
      if (isPersonNodeType(childNode)) {
        calculateChildNodePosition(wholeNodes, childNode, level + 1, cumulativeOffset);
        if (childNode?.data?.children?.length || childNode?.data?.spouse?.length) {
          cumulativeOffset += childNode.data.descendantsWidth;
        } else {
          cumulativeOffset += BASE_SIBLINGS_SPACING;
        }
      }
    });
  } else if (node.type === 'marital') {
    node.position.x = offsetX + BASE_MARITAL_SPACING;
  }
};