import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { wholeNodesState } from '@/recoil/WholeNodesState';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { calculateNodesPosition } from '@/utils/calculateNodesPosition';
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from '@/utils/constants';
import { filterDirectLineagesNodes } from '@/utils/filterDirectLineageNodes';
import { getSelectedNodePosition } from '@/utils/getSelectedNodePosition';
import { useEdgesState, useNodesState, useReactFlow, useViewport } from 'reactflow';
import { useRecoilState } from 'recoil';

export const useInitFamilyTree = () => {
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges);
  const { zoom } = useViewport();
  const reactFlowInstance = useReactFlow();

  const updateFamilyTree = () => {
    console.log('updateFamilyTree');
    if (!selectedNode) return;
    const calculatedWholeNodes = calculateNodesPosition(wholeNodes, selectedNode);

    if (!calculatedWholeNodes) return;
    setWholeNodes(calculatedWholeNodes);
    const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(calculatedWholeNodes, wholeEdges, selectedNode);
    setNodes(directLineageNodes);
    setEdges(directLineageEdges);
    const [selectedNodePositionX, selectedNodePositionY] = getSelectedNodePosition(calculatedWholeNodes, selectedNode);
    reactFlowInstance.setCenter(selectedNodePositionX + BASE_PERSON_NODE_WIDTH / 2, selectedNodePositionY + BASE_PERSON_NODE_HEIGHT / 2, {
      zoom,
      duration: 1000,
    });
  }


  return { nodes, edges, onNodesChange, onEdgesChange, updateFamilyTree };
};
