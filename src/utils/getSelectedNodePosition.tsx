import { MaritalNodeType, PersonNodeType } from '../types/PersonNodeType';
import { isPersonNodeType } from '../typeGuards/personTypeGuards';

export function getSelectedNodePosition(nodesList: (PersonNodeType | MaritalNodeType)[], selectedNode: PersonNodeType): number[] {
  const defaultPosition = [0, 0];
  if (!selectedNode || !nodesList.length) return defaultPosition;

  const displayedNode = nodesList.find((node) => node.id === selectedNode.id);
  if (!isPersonNodeType(displayedNode)) return defaultPosition;
  if (displayedNode.position.x === undefined || !displayedNode.position.y === undefined) {
    return [selectedNode.position.x, selectedNode.position.y];
  }
  return [displayedNode.position.x, displayedNode.position.y];
}
