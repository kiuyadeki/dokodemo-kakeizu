import { useRecoilState } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { wholeEdgesState } from '../recoil/WholeEdgesState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { nodesUpdatedState } from '../recoil/nodesUpdatedState';
import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PersonNode } from './ui/PersonNode';
import { MaritalNode } from './ui/MaritalStatusNode';
import { ReactFlow, Background, BackgroundVariant, useEdgesState, useNodesState, useReactFlow, useViewport } from 'reactflow';
import { filterDirectLineagesNodes } from '../utils/filterDirectLineageNodes';
import { calculateNodesPosition } from '../utils/calculateNodesPosition';
import { PersonNodeData } from '../types/PersonNodeData';
import { getSelectedNodePosition } from '../utils/getSelectedNodePosition';
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from '../utils/constants';
import { ParentChildEdge } from './ui/ParentChildEdge';
import styled from 'styled-components';
import { isPersonNodeData } from '@/typeGuards/personTypeGuards';
import { updateFamilyTreeData } from '@/services/updateFamilyTreeData';
import { fetchFamilyTree } from '@/services/fetchFamilyTree';
import { useHandlePersonNodeClick } from '@/hooks/useHandlePersonNodeClick';
import { Box } from '@chakra-ui/react';

export const FamilyTreeWrapper = (props: { openModal: () => void }) => {
  const { openModal } = props;
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);
  const [familyTreeInstance, setFamilyTreeInstance] = useState(null);

  const onSave = () => {
    if (reactFlowInstance) {
      const tree = reactFlowInstance.toObject();
      sessionStorage.setItem('example-familyTree', JSON.stringify(tree));
      // console.log('tree', tree);
    }
  };

  const onUpdate = () => {
    if (reactFlowInstance) {
      const tree = reactFlowInstance.toObject();
      updateFamilyTreeData(JSON.stringify(tree), 'aa9230d2-3c05-4cab-ae52-a9cc5e81b8ed');
    }
  };

  // useEffect(() => {
  //   onUpdate();
  // }, []);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const nodeTypes = useMemo(() => ({ person: PersonNode, marital: MaritalNode }), []);
  const edgeTypes = useMemo(() => ({ parentChild: ParentChildEdge }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges);
  const handleNodeClick = useHandlePersonNodeClick(openModal);
  const { setCenter } = useReactFlow();
  const { x, y, zoom } = useViewport();
  const reactFlowInstance = useReactFlow();
  useEffect(() => {
    setSelectedNode(wholeNodes[0] as PersonNodeData);
  }, []);

  useEffect(() => {
    reactFlowInstance.fitView({
      padding: 20,
    });
  }, [reactFlowInstance]);
  useEffect(() => {
    console.log('wholeNodes', wholeNodes);
    // console.log('wholeEdges', wholeEdges);
    if (nodesUpdated && selectedNode) {
      const calculatedWholeNodes = calculateNodesPosition(wholeNodes, selectedNode);
      if (!calculatedWholeNodes) return;
      setWholeNodes(calculatedWholeNodes);
      const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(calculatedWholeNodes, wholeEdges, selectedNode);
      setNodes(directLineageNodes);
      setEdges(directLineageEdges);
      setNodesUpdated(false);
      const [selectedNodePostionX, selectedNodePostionY] = getSelectedNodePosition(calculatedWholeNodes, selectedNode) || [0, 0];
      setCenter(selectedNodePostionX + BASE_PERSON_NODE_WIDTH / 2, selectedNodePostionY + BASE_PERSON_NODE_HEIGHT / 2, {
        zoom,
        duration: 1000,
      });
    }
  }, [nodesUpdated]);

  useEffect(() => {
    if (selectedNode) {
      setNodesUpdated(true);
      onSave();
    }
  }, [selectedNode]);

  return (
    <Box w='100vw' h='100vh' className='wrapper' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, node) => {
          handleNodeClick(node, selectedNode)
        }}
        nodesDraggable={false}
        fitView
        fitViewOptions={{ padding: 10 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color='#ddd' variant={BackgroundVariant.Lines} gap={[340, 250]} />
      </ReactFlow>
    </Box>
  );
};
