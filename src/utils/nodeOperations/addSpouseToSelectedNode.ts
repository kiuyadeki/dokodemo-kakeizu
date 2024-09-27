import { Edge, Node } from 'reactflow';
import { createMaritalNode, createPersonNode } from './nodeUtils';
import { createEdge } from './edgeUtils';
import { BASE_MARITAL_SPACING } from '../common/constants';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData } from '@/types/NodeData';
import { PersonData } from '@/types/NodeData';

export const addSpouseToSelectedNode = (
  nodeList: Node<NodeData>[],
  edgeList: Edge[],
  selectedNode: Node<PersonData> | undefined
) => {
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];

  if (!isPersonNodeType(selectedNode)) {
    return { nodesCopy, edgesCopy };
  }
  let selectedNodeMaritalPosition = selectedNode.data.maritalPosition;
  if (!selectedNodeMaritalPosition) {
    selectedNodeMaritalPosition = 'left';
  }
  const maritalNode = createMaritalNode({
    x: selectedNode.position.x + BASE_MARITAL_SPACING,
    y: selectedNode.position.y,
  });

  const selectedToMaritalEdge = createEdge(
    selectedNode.id,
    maritalNode.id,
    'Marital',
    'personSourceRight',
    'maritalTargetLeft'
  );

  const SpouseNode = createPersonNode(
    {
      x: selectedNode.position.x + BASE_MARITAL_SPACING * 2,
      y: selectedNode.position.y,
    },
    {
      spouse: [selectedNode.id],
      maritalNodeId: maritalNode.id,
      maritalPosition: selectedNodeMaritalPosition === 'left' ? 'right' : 'left',
    }
  );

  const spouseToMaritalEdge = createEdge(
    SpouseNode.id,
    maritalNode.id,
    'Marital',
    'personSourceLeft',
    'maritalTargetRight'
  );

  const updatedNode = {
    ...selectedNode,
    data: {
      ...selectedNode.data,
      spouse: [SpouseNode.id],
      maritalNodeId: maritalNode.id,
      maritalPosition: selectedNodeMaritalPosition,
    },
  };

  const updatedNodesCopy = nodesCopy
    .map((node) => (node.id === selectedNode.id ? updatedNode : node))
    .concat([maritalNode, SpouseNode]);
  const updatedEdgesCopy = [...edgesCopy, selectedToMaritalEdge, spouseToMaritalEdge];

  return { nodesCopy: updatedNodesCopy, edgesCopy: updatedEdgesCopy };
};
