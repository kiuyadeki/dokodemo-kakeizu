import { Edge } from 'reactflow';
import { createMaritalNode, createPersonNode } from './nodeUtils';
import { createEdge } from './edgeUtils';
import {
  BASE_GENERATIONS_SPACING,
  BASE_MARITAL_NODE_HEIGHT,
  BASE_MARITAL_NODE_WIDTH,
  BASE_MARITAL_SPACING,
  BASE_PERSON_NODE_HEIGHT,
  BASE_PERSON_NODE_WIDTH,
} from '../common/constants';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';

export const addParentToSelectedNode = (
  nodeList: (PersonNodeType | MaritalNodeType)[],
  edgeList: Edge[],
  selectedNode: PersonNodeType | undefined
) => {
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];

  if (!selectedNode) return { nodesCopy, edgesCopy };

  const maritalNode = createMaritalNode({
    x: selectedNode.position.x + (BASE_PERSON_NODE_WIDTH - BASE_MARITAL_NODE_WIDTH) / 2,
    y: selectedNode.position.y - BASE_GENERATIONS_SPACING + (BASE_PERSON_NODE_HEIGHT - BASE_MARITAL_NODE_HEIGHT) / 2,
  });
  const leftParentNode = createPersonNode(
    {
      x: selectedNode.position.x - BASE_MARITAL_SPACING,
      y: selectedNode.position.y - BASE_GENERATIONS_SPACING,
    },
    {
      children: [selectedNode.id],
      maritalNodeId: maritalNode.id,
      maritalPosition: 'left',
    }
  );
  const rightParentNode = createPersonNode(
    {
      x: selectedNode.position.x + BASE_MARITAL_SPACING,
      y: selectedNode.position.y - BASE_GENERATIONS_SPACING,
    },
    {
      children: [selectedNode.id],
      spouse: [leftParentNode.id],
      maritalNodeId: maritalNode.id,
      maritalPosition: 'right',
    }
  );
  leftParentNode.data.spouse.push(rightParentNode.id);

  const edgesToAdd = [
    createEdge(selectedNode.id, maritalNode.id, 'parentChild', 'personSourceTop', 'maritalTargetBottom'),
    createEdge(leftParentNode.id, maritalNode.id, 'Marital', 'personSourceRight', 'maritalTargetLeft'),
    createEdge(rightParentNode.id, maritalNode.id, 'Marital', 'personSourceLeft', 'maritalTargetRight'),
  ];

  const updatedNode = {
    ...selectedNode,
    data: {
      ...selectedNode.data,
      parents: [leftParentNode.id, rightParentNode.id],
    },
  };

  const updatedNodesCopy = nodesCopy
    .map((node) => (node.id === selectedNode.id ? updatedNode : node))
    .concat([maritalNode, leftParentNode, rightParentNode]);
  const updatedEdgesCopy = [...edgesCopy, ...edgesToAdd];

  return { nodesCopy: updatedNodesCopy, edgesCopy: updatedEdgesCopy };
};
