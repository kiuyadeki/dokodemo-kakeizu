import { selectedNodeState } from "@/recoil/selectedNodeState";
import { isPersonNodeData } from "@/typeGuards/personTypeGuards";
import { PersonNodeData } from "@/types/PersonNodeData";
import { Node } from "reactflow";
import { useRecoilState } from "recoil";

export const useHandlePersonNodeClick = (openModal: () => void) => {
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);

  return (clickedNode: Node, selectedNode: PersonNodeData | null) => {
    if (!isPersonNodeData(clickedNode) || !isPersonNodeData(selectedNode)) return;
    setSelectedNode(clickedNode);
    if (selectedNode && clickedNode.id === selectedNode.id) {
      openModal();
    }
  }
}