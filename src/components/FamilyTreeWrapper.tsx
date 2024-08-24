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
import { Box, Button } from '@chakra-ui/react';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';

interface FamilyTreeWrapperProps {
  // projectId: string | undefined;
  openModal: () => void;
  nodes: Node<MaritalData, string | undefined>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void;
  onUpdate: (id: string) => void;
  // familyTreeData: string | null | undefined;
}

export const FamilyTreeWrapper: FC<FamilyTreeWrapperProps> = (props) => {
  const { openModal, nodes, edges, onNodesChange, onEdgesChange, updateFamilyTree, onUpdate} = props;
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const nodeTypes = useMemo(() => ({ person: PersonNode, marital: MaritalNode }), []);
  const edgeTypes = useMemo(() => ({ parentChild: ParentChildEdge }), []);
  const handleNodeClick = useHandlePersonNodeClick(openModal, updateFamilyTree);
  useEffect(() => {
    console.log('nodes', nodes);
    if (!nodes.length) return;
    setWholeNodes(nodes as (PersonNodeType | MaritalNodeType)[]);
    setWholeEdges(edges);
    setSelectedNode(wholeNodes[0] as PersonNodeType);
  }, []);

  useEffect(() => {
    console.log('wholeNodes', wholeNodes);
    console.log('wholeEdges', wholeEdges);
  },[wholeNodes]);

  const handleSaveButtonClick = () => {
    // if (projectId) {
    //   onUpdate(projectId);
    // } else {
    //   openModal();
    // }
  }

  useEffect(() => {
    updateFamilyTree(wholeNodes, wholeEdges);
  }, [selectedNode]);

  return (
    <Box w='100vw' h='100vh' className='wrapper' ref={reactFlowWrapper}>
      {/* onUpdate(projectId);でdynamodb上のデータを更新する？要検証 */}
      <Button onClick={handleSaveButtonClick} position="absolute" right={4} top={4} zIndex={10}>Update</Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // nodes={formatedFamilyTreeData.nodes}
        // edges={formatedFamilyTreeData.edges}
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
        proOptions={{ hideAttribution: true }}
      >
        <Background color='#ddd' variant={BackgroundVariant.Lines} gap={[340, 250]} />
      </ReactFlow>
    </Box>
  );
};
