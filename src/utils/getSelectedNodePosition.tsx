import { MaritalNodeData, PersonNodeData } from '../types/PersonNodeData';
import { isPersonNodeData } from '../typeGuards/personTypeGuards';

export function getSelectedNodePosition(nodesList: Node<PersonData>[], selectedNode: PersonNodeData): number[] {
  const defaultPosition = [0, 0];

  if (!selectedNode || !nodesList.length) return defaultPosition;

  const displayedNode = nodesList.find((node) => node.id === selectedNode.id);
  if (!displayedNode || !isPersonNodeData(displayedNode)) return defaultPosition;
  if (displayedNode.position.x === undefined || !displayedNode.position.y === undefined) {
    return [selectedNode.position.x, selectedNode.position.y];
  }
  return [displayedNode.position.x, displayedNode.position.y];
}
