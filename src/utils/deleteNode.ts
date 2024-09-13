import { MaritalData, MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { Edge } from "reactflow";
import extractEdgesFromNode from "./extractEdgesFromNode";

export const deleteNode = (
  nodeList: (PersonNodeType | MaritalNodeType)[],
  edgeList: Edge[],
  selectedNode: PersonNodeType | undefined
) => {
  const nodesCopy = [...nodeList];
  const edgesCopy = [...edgeList];
  const outgoingEdges = extractEdgesFromNode(edgeList, selectedNode);

  if (!selectedNode) return { nodesCopy, edgesCopy };


  console.log(outgoingEdges);
}