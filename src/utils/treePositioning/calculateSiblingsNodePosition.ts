import { NodeData, PersonData } from "@/types/NodeData";
import { sortNodesByAge } from "../nodeOperations/sortNodesByAge";
import { calculateChildNodePosition } from "./calculateChildNodePosition";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { Node } from "reactflow";

export const calculateSiblingsNodePosition = (
  wholeNodes: Node<NodeData>[],
  selectedNode: Node<PersonData>,
) => {
  const siblingsNodes = wholeNodes.filter((node) => selectedNode.data.siblings?.includes(node.id));
  const sortedSiblingsNodes = sortNodesByAge(siblingsNodes);
  let siblingsOffset = 0;
  sortedSiblingsNodes.forEach((node) => {
    calculateChildNodePosition(wholeNodes, node, 0, siblingsOffset);
    if (isPersonNodeType(node)) {
      siblingsOffset += node.data.descendantsWidth;
    }
  });
}