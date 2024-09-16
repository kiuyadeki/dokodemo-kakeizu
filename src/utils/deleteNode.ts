import { MaritalData, MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { Edge } from "reactflow";
import extractEdgesFromNode from "./extractEdgesFromNode";

export const deleteNode = (
  nodeList: (PersonNodeType | MaritalNodeType)[],
  edgeList: Edge[],
  selectedNode: PersonNodeType | undefined
) => {
  if (!selectedNode) return { nodeList, edgeList };
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];

  const outgoingEdges = extractEdgesFromNode(edgeList, selectedNode);
  if (outgoingEdges.length <= 1 && selectedNode.data.children.length === 0) {
    const updatedNodeList = nodesCopy.filter((node) => node.id !== selectedNode.id);
    const updatedEdgeList = edgesCopy.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id);
    console.log('updatedNodeList', updatedNodeList);
    console.log('updatedEdgeList', updatedEdgeList);
    return { nodeList: updatedNodeList, edgeList: updatedEdgeList };
  }
  return { nodeList, edgeList}
}