import { Edge } from 'reactflow';
import extractEdgesFromNode from './extractEdgesFromNode';
import { createMaritalNode, createPersonNode } from './nodeUtils';
import { createEdge } from './edgeUtils';
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from './constants';
import { isPersonNodeType } from '../typeGuards/personTypeGuards';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';

export const addChildNodeToSelectedNode = (nodeList: (PersonNodeType | MaritalNodeType)[], edgeList: Edge[], selectedNode: PersonNodeType | undefined) => {
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];
  const outgoingEdges = extractEdgesFromNode(edgesCopy, selectedNode);

  if (!selectedNode) return { nodesCopy, edgesCopy };

  let selectedNodeMaritalPosition = selectedNode.data.maritalPosition;
  if (!selectedNodeMaritalPosition) {
    selectedNodeMaritalPosition = 'left';
  }
  let maritalNodeId: MaritalNodeType['id'];
  let spouseID: MaritalNodeType['id'] = selectedNode.data.spouse[0] || '';
  if (!selectedNode.data.spouse.length) {
    const maritalNode = createMaritalNode({
      x: selectedNode.position.x + BASE_MARITAL_SPACING,
      y: selectedNode.position.y,
    });
    maritalNodeId = maritalNode.id;
    const spouseNode = createPersonNode(
      { x: selectedNode.position.x + BASE_MARITAL_SPACING * 2, y: selectedNode.position.y },
      {
        spouse: [selectedNode.id],
        maritalNodeId: maritalNodeId,
        maritalPosition: selectedNodeMaritalPosition === 'left' ? 'right' : 'left',
      }
    );
    spouseID = spouseNode.id;
    nodesCopy.push(maritalNode, spouseNode);
    edgesCopy.push(
      createEdge(selectedNode.id, maritalNodeId, 'smoothstep', 'personSourceRight', 'maritalTargetLeft'),
      createEdge(spouseID, maritalNodeId, 'smoothstep', 'personSourceLeft', 'maritalTargetRight')
    );
  } else {
    maritalNodeId = outgoingEdges.find((edge) => edge.sourceHandle === 'personSourceRight' || edge.sourceHandle === 'personSourceLeft')?.target || '';
  }

  const childNode = createPersonNode(
    { x: selectedNode.position.x + BASE_MARITAL_SPACING, y: selectedNode.position.y + BASE_GENERATIONS_SPACING },
    { parents: [selectedNode.id, spouseID], siblings: [...selectedNode.data.children] }
  );
  childNode.data.siblings?.push(childNode.id);

  const updateChildren = (node: PersonNodeType, childId: string): PersonNodeType => ({
    ...node,
    data: { ...node.data, children: [...node.data.children, childId] },
  });

  const updateSpouseAndChildren = (node: PersonNodeType, spouseId: string, childId: string, maritalNodeId: string, maritalPosition: 'left' | 'right' | undefined): PersonNodeType => ({
    ...node,
    data: {
      ...node.data,
      spouse: [...node.data.spouse, spouseId],
      children: [...node.data.children, childId],
      maritalNodeId,
      maritalPosition,
    },
  });

  const updateSiblings = (node: PersonNodeType, siblings: string[], childId: string): PersonNodeType => ({
    ...node,
    data: { ...node.data, siblings: [...siblings, childId] },
  });

  const updatedNodesCopy = nodesCopy
    .map((node) => {
      if (isPersonNodeType(node)) {
        if (node.id == spouseID) {
          return updateChildren(node, childNode.id);
        } else if (node.id === selectedNode.id) {
          return updateSpouseAndChildren(node, spouseID, childNode.id, maritalNodeId, selectedNodeMaritalPosition);
        } else if (selectedNode.data.children.includes(node.id)) {
          return updateSiblings(node, selectedNode.data.children, childNode.id);
        }
      }
      return node;
    }).concat(childNode);

  edgesCopy.push(createEdge(childNode.id, maritalNodeId, 'parentChild', 'personSourceTop', 'maritalTargetBottom'));

  return { nodesCopy: updatedNodesCopy, edgesCopy };
};
