import { selectedNodeState } from "@/recoil/selectedNodeState";
import { wholeEdgesState } from "@/recoil/WholeEdgesState";
import { wholeNodesState } from "@/recoil/WholeNodesState";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { Edge, Node } from "reactflow";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const useHandlePersonNodeClick = (openModal: () => void, updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void) => {
  const setSelectedNode = useSetRecoilState(selectedNodeState);

  return (clickedNode: Node, selectedNode: PersonNodeType | undefined) => {
    if (!isPersonNodeType(clickedNode) || !isPersonNodeType(selectedNode)) return;
    setSelectedNode(clickedNode);
    if (isPersonNodeType(selectedNode) && clickedNode.id === selectedNode.id) {
      openModal();
    }
  }
}