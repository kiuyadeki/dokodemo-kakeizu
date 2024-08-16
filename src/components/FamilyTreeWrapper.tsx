import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { FC, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PersonNode } from './ui/PersonNode';
import { MaritalNode } from './ui/MaritalStatusNode';
import { ReactFlow, Background, BackgroundVariant, useEdgesState, useNodesState, useReactFlow, useViewport, Edge, Node, OnNodesChange, OnEdgesChange } from 'reactflow';
import { PersonNodeType, MaritalNodeType, MaritalData } from '../types/PersonNodeType';
import { ParentChildEdge } from './ui/ParentChildEdge';
import { useHandlePersonNodeClick } from '@/hooks/useHandlePersonNodeClick';
import { Box } from '@chakra-ui/react';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';

interface FamilyTreeWrapperProps {
  openModal: () => void;
  nodes: Node<MaritalData, string | undefined>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void;
}

export const FamilyTreeWrapper: FC<FamilyTreeWrapperProps> = (props) => {
  const { openModal, nodes, edges, onNodesChange, onEdgesChange, updateFamilyTree } = props;
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);

  // const onSave = () => {
  //   if (reactFlowInstance) {
  //     const tree = reactFlowInstance.toObject();
  //     sessionStorage.setItem('example-familyTree', JSON.stringify(tree));
  //     // console.log('tree', tree);
  //   }
  // };

  // const onUpdate = () => {
  //   if (reactFlowInstance) {
  //     const tree = reactFlowInstance.toObject();
  //     updateFamilyTreeData(JSON.stringify(tree), 'aa9230d2-3c05-4cab-ae52-a9cc5e81b8ed');
  //   }
  // };

  // useEffect(() => {
  //   onUpdate();
  // }, []);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const nodeTypes = useMemo(() => ({ person: PersonNode, marital: MaritalNode }), []);
  const edgeTypes = useMemo(() => ({ parentChild: ParentChildEdge }), []);
  const handleNodeClick = useHandlePersonNodeClick(openModal, updateFamilyTree);
  useEffect(() => {
    setSelectedNode(wholeNodes[0] as PersonNodeType);
  }, []);

  useEffect(() => {
    updateFamilyTree(wholeNodes, wholeEdges);
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
          handleNodeClick(node, selectedNode);
          updateFamilyTree(wholeNodes, wholeEdges);
          console.log('selectedNode', selectedNode);
        }}
        nodesDraggable={false}
        fitView
        fitViewOptions={{ padding: 20 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color='#ddd' variant={BackgroundVariant.Lines} gap={[340, 250]} />
      </ReactFlow>
    </Box>
  );
};
