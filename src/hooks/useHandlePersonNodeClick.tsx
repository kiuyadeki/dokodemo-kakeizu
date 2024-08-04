import { selectedNodeState } from "@/recoil/selectedNodeState";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { PersonNodeType } from "@/types/PersonNodeType";
import { Node } from "reactflow";
import { useRecoilState } from "recoil";

export const useHandlePersonNodeClick = (openModal: () => void) => {
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);

  return (clickedNode: Node, selectedNode: PersonNodeType | undefined) => {
    if (!isPersonNodeType(clickedNode) || !isPersonNodeType(selectedNode)) return;
    setSelectedNode(clickedNode);
    if (isPersonNodeType(selectedNode) && clickedNode.id === selectedNode.id) {
      openModal();
    }
  }
}