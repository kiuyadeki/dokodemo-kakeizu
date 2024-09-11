import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { FC, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PersonNode } from './ui/PersonNode';
import { MaritalNode } from './ui/MaritalStatusNode';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useViewport,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import { PersonNodeType, MaritalNodeType, MaritalData } from '../types/PersonNodeType';
import { ParentChildEdge } from './ui/ParentChildEdge';
import { useHandlePersonNodeClick } from '@/hooks/useHandlePersonNodeClick';
import { background, Box, Button, useToast } from '@chakra-ui/react';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { on } from 'events';

interface FamilyTreeWrapperProps {
  openModal: () => void;
  projectId: string | undefined;
  nodes: Node<MaritalData, string | undefined>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void;
  onUpdate: (id: string) => Promise<boolean | undefined>;
}

export const FamilyTreeWrapper: FC<FamilyTreeWrapperProps> = (props) => {
  const { openModal, projectId, nodes, edges, onNodesChange, onEdgesChange, updateFamilyTree, onUpdate } = props;
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const nodeTypes = useMemo(() => ({ person: PersonNode, marital: MaritalNode }), []);
  const edgeTypes = useMemo(() => ({ parentChild: ParentChildEdge }), []);
  const handleNodeClick = useHandlePersonNodeClick(openModal, updateFamilyTree);
  const toast = useToast();
  useEffect(() => {
    if (!nodes.length) return;
    setWholeNodes(nodes as (PersonNodeType | MaritalNodeType)[]);
    setWholeEdges(edges);
    setSelectedNode(wholeNodes[0] as PersonNodeType);
  }, []);

  const handleSaveButtonClick = async () => {
    if (projectId) {
      const result = await onUpdate(projectId);
      if (result) {
        toast({
          title: '保存が成功しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: '保存が失敗しました',
          description: '家系図の更新中にエラーが発生しました。もう一度お試しください。',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      openModal();
    }
  };

  useEffect(() => {
    updateFamilyTree(wholeNodes, wholeEdges);
  }, [selectedNode]);

  const styles = {
    background: '#E7E1C5',
    backgroundImage: 'url(/bg_noise.png)',
  };

  return (
    <Box w="100vw" h="100vh" className="wrapper" ref={reactFlowWrapper}>
      <Button onClick={handleSaveButtonClick} position="absolute" right={4} top={4} zIndex={10}>
        保存する
      </Button>
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
        }}
        nodesDraggable={false}
        fitView
        fitViewOptions={{ padding: 20 }}
        style={styles}
        proOptions={{ hideAttribution: true }}
      ></ReactFlow>
    </Box>
  );
};
