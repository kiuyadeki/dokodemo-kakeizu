import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { wholeNodesState } from '@/recoil/WholeNodesState';
import { updateFamilyTreeData } from '@/services/updateFamilyTreeData';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { calculateNodesPosition } from '@/utils/calculateNodesPosition';
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from '@/utils/constants';
import { filterDirectLineagesNodes } from '@/utils/filterDirectLineageNodes';
import { getSelectedNodePosition } from '@/utils/getSelectedNodePosition';
import { Edge, useEdgesState, useNodesState, useReactFlow, useViewport } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useInitFamilyTree = () => {
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const selectedNode = useRecoilValue(selectedNodeState);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges);
  const { zoom } = useViewport();
  const reactFlowInstance = useReactFlow();

  const onUpdate = (id: string) => {
    if (reactFlowInstance) {
      const tree = reactFlowInstance.toObject();
      updateFamilyTreeData(JSON.stringify(tree), id);
    }
  };

  const updateFamilyTree = (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => {
    if (!selectedNode) return;
    const calculatedWholeNodes = calculateNodesPosition(nodes, selectedNode);

    if (!calculatedWholeNodes) return;
    setWholeNodes(calculatedWholeNodes);
    // console.log('calculatedWholeNodes', calculatedWholeNodes);
    setWholeEdges(edges);
    const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(calculatedWholeNodes, edges, selectedNode);
    setNodes(directLineageNodes);
    setEdges(directLineageEdges);
    const [selectedNodePositionX, selectedNodePositionY] = getSelectedNodePosition(calculatedWholeNodes, selectedNode);
    reactFlowInstance.setCenter(selectedNodePositionX + BASE_PERSON_NODE_WIDTH / 2, selectedNodePositionY + BASE_PERSON_NODE_HEIGHT / 2, {
      zoom,
      duration: 1000,
    });
  }


  return { nodes, edges, onNodesChange, onEdgesChange, onUpdate, updateFamilyTree };
};
