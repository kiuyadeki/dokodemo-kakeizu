import { Edge, Node } from 'reactflow';
import extractEdgesFromNode from './extractEdgesFromNode';
import { createMaritalNode, createPersonNode } from './nodeUtils';
import { createEdge } from './edgeUtils';
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from '../common/constants';
import { isPersonNodeType } from '../../typeGuards/personTypeGuards';
import { NodeData, PersonData } from '@/types/NodeData';
import { updateSpouseAndChildren } from './updateSpouseAndChildren';
import { updateSiblings } from './updateSiblings';
import { updateChildren } from './updateChildren';

export const addChildNodeToSelectedNode = (
  nodeList: Node<NodeData>[],
  edgeList: Edge[],
  selectedNode: Node<PersonData> | undefined
) => {
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];
  const outgoingEdges = extractEdgesFromNode(edgesCopy, selectedNode);

  if (!selectedNode) return { nodesCopy, edgesCopy };

  let selectedNodeMaritalPosition = selectedNode.data.maritalPosition;
  if (!selectedNodeMaritalPosition) {
    selectedNodeMaritalPosition = 'left';
  }
  let maritalNodeId: Node<PersonData>['id'];
  let spouseID: Node<PersonData>['id'] = selectedNode.data.spouse[0] || '';
  if (!selectedNode.data.spouse.length) {
    const maritalNode = createMaritalNode({
      x: selectedNode.position.x + BASE_MARITAL_SPACING,
      y: selectedNode.position.y,
    });
    maritalNodeId = maritalNode.id;
    const spouseNode = createPersonNode(
      {
        x: selectedNode.position.x + BASE_MARITAL_SPACING * 2,
        y: selectedNode.position.y,
      },
      {
        spouse: [selectedNode.id],
        maritalNodeId: maritalNodeId,
        maritalPosition: selectedNodeMaritalPosition === 'left' ? 'right' : 'left',
      }
    );
    spouseID = spouseNode.id;
    nodesCopy.push(maritalNode, spouseNode);
    edgesCopy.push(
      createEdge(selectedNode.id, maritalNodeId, 'Marital', 'personSourceRight', 'maritalTargetLeft'),
      createEdge(spouseID, maritalNodeId, 'Marital', 'personSourceLeft', 'maritalTargetRight')
    );
  } else {
    maritalNodeId =
      outgoingEdges.find(
        (edge) => edge.sourceHandle === 'personSourceRight' || edge.sourceHandle === 'personSourceLeft'
      )?.target || '';
  }

  const childNode = createPersonNode(
    {
      x: selectedNode.position.x + BASE_MARITAL_SPACING,
      y: selectedNode.position.y + BASE_GENERATIONS_SPACING,
    },
    {
      parents: [selectedNode.id, spouseID],
      siblings: [...selectedNode.data.children],
    }
  );
  childNode.data.siblings?.push(childNode.id);

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
    })
    .concat(childNode);

  edgesCopy.push(createEdge(childNode.id, maritalNodeId, 'parentChild', 'personSourceTop', 'maritalTargetBottom'));

  return { nodesCopy: updatedNodesCopy, edgesCopy };
};
