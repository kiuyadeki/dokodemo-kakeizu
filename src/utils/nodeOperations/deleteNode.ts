import { Edge, Node } from 'reactflow';
import extractEdgesFromNode from './extractEdgesFromNode';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { isDeletableNode } from './isDeletableNode';
import { NodeData, PersonData } from '@/types/NodeData';

export const deleteNode = (
  nodeList: Node<NodeData>[],
  edgeList: Edge[],
  selectedNode: Node<PersonData> | undefined
) => {
  if (!selectedNode) return { nodeList, edgeList };
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];

  const outgoingEdges = extractEdgesFromNode(edgeList, selectedNode);
  if (isDeletableNode(edgeList, selectedNode)) {
    if (outgoingEdges[0].sourceHandle === 'personSourceTop') {
      const updatedNodeList = nodesCopy.filter((node) => node.id !== selectedNode.id);
      const newUpdatedNodeList = updatedNodeList.map((node) => {
        if (isPersonNodeType(node) && selectedNode.data.parents.includes(node.id)) {
          const filteredChildren = node.data.children.filter((child) => child !== selectedNode.id);
          return { ...node, data: { ...node.data, children: filteredChildren } };
        }
        return node;
      });
      const updatedEdgeList = edgesCopy.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      );
      return { nodeList: newUpdatedNodeList, edgeList: updatedEdgeList };
    } else if (outgoingEdges[0].sourceHandle === ('personSourceLeft' || 'personSourceRight')) {
      const updatedNodeList = nodesCopy.filter(
        (node) => node.id !== selectedNode.id && selectedNode.data.maritalNodeId !== node.id
      );
      const newUpdatedNodeList = updatedNodeList.map((node) => {
        if (isPersonNodeType(node) && selectedNode.data.spouse.includes(node.id)) {
          const filteredSpouse = node.data.spouse.filter((spouse) => spouse !== selectedNode.id);
          return {
            ...node,
            data: { ...node.data, spouse: filteredSpouse, maritalPosition: undefined, maritalNodeId: undefined },
          };
        }
        return node;
      });
      const updatedEdgeList = edgesCopy.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.data.maritalNodeId
      );
      return { nodeList: newUpdatedNodeList, edgeList: updatedEdgeList };
    }
  }
  return { nodeList, edgeList };
};
