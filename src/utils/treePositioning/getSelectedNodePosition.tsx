import { NodeData, PersonData } from '../../types/NodeData';
import { isPersonNodeType } from '../../typeGuards/personTypeGuards';
import { Node } from 'reactflow';

export function getSelectedNodePosition(
  nodesList: Node<NodeData>[],
  selectedNode: Node<PersonData>,
): number[] {
  const defaultPosition = [0, 0];
  if (!selectedNode || !nodesList.length) return defaultPosition;

  const displayedNode = nodesList.find((node) => node.id === selectedNode.id);
  if (!isPersonNodeType(displayedNode)) return defaultPosition;
  if (displayedNode.position.x === undefined || !displayedNode.position.y === undefined) {
    return [selectedNode.position.x, selectedNode.position.y];
  }
  return [displayedNode.position.x, displayedNode.position.y];
}
