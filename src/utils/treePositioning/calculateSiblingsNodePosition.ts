import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { sortNodesByAge } from "../nodeOperations/sortNodesByAge";
import { calculateChildNodePosition } from "./calculateChildNodePosition";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";

export const calculateSiblingsNodePosition = (
  wholeNodes: (PersonNodeType | MaritalNodeType)[],
  selectedNode: PersonNodeType
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