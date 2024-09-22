import { PersonNodeType, MaritalNodeType } from '../../types/PersonNodeType';
import { isPersonNodeType } from '../../typeGuards/personTypeGuards';
import { setDescendants } from './setDescendants';
import { setAncestors } from './setAncestors';
import { calculateParentNodePosition } from './calculateParentNodePosition';
import { calculateSiblingsNodePosition } from './calculateSiblingsNodePosition';

export function calculateNodesPosition(
  wholeNodes: (PersonNodeType | MaritalNodeType)[],
  selectedNode: PersonNodeType | undefined
) {
  if (!selectedNode) return;
  const wholeNodesCopy = structuredClone(wholeNodes);
  if (!wholeNodesCopy) return;
  const selectedNodesCopy = wholeNodesCopy.find((node) => node.id === selectedNode.id);
  if (!selectedNodesCopy || !isPersonNodeType(selectedNodesCopy)) return;

  setDescendants(wholeNodesCopy);
  setAncestors(wholeNodesCopy);
  calculateSiblingsNodePosition(wholeNodesCopy, selectedNodesCopy);
  calculateParentNodePosition(wholeNodesCopy, selectedNodesCopy, selectedNodesCopy, 0, 0, '');
  return wholeNodesCopy;
}
