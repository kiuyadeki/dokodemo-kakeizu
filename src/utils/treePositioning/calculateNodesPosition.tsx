import { NodeData, PersonData } from '../../types/NodeData';
import { isPersonNodeType } from '../../typeGuards/personTypeGuards';
import { setDescendants } from './setDescendants';
import { setAncestors } from './setAncestors';
import { calculateParentNodePosition } from './calculateParentNodePosition';
import { calculateSiblingsNodePosition } from './calculateSiblingsNodePosition';
import { Node } from 'reactflow';

export function calculateNodesPosition(
  wholeNodes: Node<NodeData>[],
  selectedNode: Node<PersonData> | undefined
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
