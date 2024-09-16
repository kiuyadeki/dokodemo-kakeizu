import { MaritalData, MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { Edge } from "reactflow";
import extractEdgesFromNode from "./extractEdgesFromNode";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";

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
    console.log(outgoingEdges);
    if (outgoingEdges[0].sourceHandle === "personSourceTop") {
      const updatedNodeList = nodesCopy.filter((node) => node.id !== selectedNode.id);
      const newUpdatedNodeList = updatedNodeList.map((node) => {
        if (isPersonNodeType(node) && selectedNode.data.parents.includes(node.id)) {
          const filteredChildren = node.data.children.filter((child) => child !== selectedNode.id);
          return { ...node, data: { ...node.data, children: filteredChildren } };
        }
        return node;
      });
      const updatedEdgeList = edgesCopy.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id);
      return { nodeList: newUpdatedNodeList, edgeList: updatedEdgeList };
    } else if (outgoingEdges[0].sourceHandle === ("personSourceLeft" || "personSourceRight")) {
      const updatedNodeList = nodesCopy.filter((node) => node.id !== selectedNode.id);
      const newUpdatedNodeList = updatedNodeList.map((node) => {
        if (isPersonNodeType(node) && selectedNode.data.spouse.includes(node.id)) {
          const filteredSpouse = node.data.spouse.filter((spouse) => spouse !== selectedNode.id);
          return { ...node, data: { ...node.data, spouse: filteredSpouse } };
        } else if (!isPersonNodeType(node) && selectedNode.data.maritalNodeId === node.id) {
          return;
        }
        return node;
      });
      const updatedEdgeList = edgesCopy.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id);
      return { nodeList: newUpdatedNodeList, edgeList: updatedEdgeList };
    }
  }
  return { nodeList, edgeList}
}