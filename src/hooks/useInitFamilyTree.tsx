import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { initialNode, wholeNodesState } from '@/recoil/WholeNodesState';
import { updateFamilyTreeData } from '@/services/updateFamilyTreeData';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { calculateNodesPosition } from '@/utils/calculateNodesPosition';
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from '@/utils/constants';
import { filterDirectLineagesNodes } from '@/utils/filterDirectLineageNodes';
import { getSelectedNodePosition } from '@/utils/getSelectedNodePosition';
import { Edge, useEdgesState, useNodesState, useReactFlow, useViewport } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useFetchFamilyTreeData } from './useFetchFamilyTreeData';
import { useEffect, useMemo, useState } from 'react';
import { useGetProjectId } from './useGetProjectId';

export const useInitFamilyTree = () => {
  const { projectId, isLoading: isLoadingId } = useGetProjectId();
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectedNode = useRecoilValue(selectedNodeState);
  const { zoom } = useViewport();
  const reactFlowInstance = useReactFlow();
  const { familyTreeData } = useFetchFamilyTreeData(projectId);

  const formatedFamilyTreeData = useMemo(() => {
    if (!familyTreeData)
      return {
        nodes: [initialNode],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      };
    return JSON.parse(familyTreeData);
  }, [familyTreeData]);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges);

  const onUpdate = async (id: string) => {
    if (reactFlowInstance) {
      const tree = reactFlowInstance.toObject();
      const result = await updateFamilyTreeData(JSON.stringify(tree), id);
      return result.success;
    }
  };

  const updateFamilyTree = (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => {
    if (!selectedNode) return;
    const calculatedWholeNodes = calculateNodesPosition(nodes, selectedNode);

    if (!calculatedWholeNodes) return;
    setWholeNodes(calculatedWholeNodes);
    console.log('calculatedWholeNodes', calculatedWholeNodes);
    setWholeEdges(edges);
    const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(
      calculatedWholeNodes,
      edges,
      selectedNode
    );
    setNodes(directLineageNodes);
    setEdges(directLineageEdges);
    const [selectedNodePositionX, selectedNodePositionY] = getSelectedNodePosition(calculatedWholeNodes, selectedNode);
    reactFlowInstance.setCenter(
      selectedNodePositionX + BASE_PERSON_NODE_WIDTH / 2,
      selectedNodePositionY + BASE_PERSON_NODE_HEIGHT / 2,
      {
        zoom,
        duration: 1000,
      }
    );
  };

  useEffect(() => {
    if (!isLoadingId && formatedFamilyTreeData.nodes.length) {
      setNodes(formatedFamilyTreeData.nodes);
      setWholeNodes(formatedFamilyTreeData.nodes)
      setEdges(formatedFamilyTreeData.edges);
      setWholeEdges(formatedFamilyTreeData.edges);
      reactFlowInstance.setViewport(formatedFamilyTreeData.viewport);
      setIsLoading(false);
    } else if (!isLoadingId && !formatedFamilyTreeData.nodes.length) {
      setNodes([initialNode]);
      setWholeNodes([initialNode])
      setEdges([]);
      setWholeEdges([]);
      setIsLoading(false);
    }
  }, [familyTreeData]);

  return {
    isLoading,
    projectId,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onUpdate,
    updateFamilyTree,
  };
};
