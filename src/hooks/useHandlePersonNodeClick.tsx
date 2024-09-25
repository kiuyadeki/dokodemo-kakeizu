import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { wholeNodesState } from '@/recoil/WholeNodesState';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData, PersonData } from '@/types/NodeData';
import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useHandlePersonNodeClick = (
  openModal: () => void,
  updateFamilyTree: (
    nodes: Node<NodeData>[],
    edges: Edge[],
    selectedNode: Node<PersonData> | undefined
  ) => void
) => {
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const [isSelectedNodeChanged, setIsSelectedNodeChanged] = useState(false);
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  useEffect(() => {
    if (isSelectedNodeChanged) {
      updateFamilyTree(wholeNodes, wholeEdges, selectedNode);
      setIsSelectedNodeChanged(false);
    }
  }, [isSelectedNodeChanged]);

  return (clickedNode: Node, selectedNode: Node<PersonData> | undefined) => {
    if (!isPersonNodeType(clickedNode) || !isPersonNodeType(selectedNode)) {
      return;
    }
    setSelectedNode(clickedNode);
    if (clickedNode.id === selectedNode.id) {
      openModal();
    } else {
      setIsSelectedNodeChanged(true);
    }
  };
};
