import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { wholeNodesState } from '@/recoil/WholeNodesState';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const useHandlePersonNodeClick = (
  openModal: () => void,
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[], selectedNode: PersonNodeType | undefined) => void,
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

  return (clickedNode: Node, selectedNode: PersonNodeType | undefined) => {
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
