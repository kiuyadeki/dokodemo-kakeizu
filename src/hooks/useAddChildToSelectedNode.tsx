import { Dispatch, SetStateAction, useState } from 'react';
import { Edge, Node } from 'reactflow';
import useOutgoingEdges from './useOutgoingEdges';
import { PersonNodeType, MaritalNodeType } from '../types/PersonNodeType';
import { createMaritalNode, createPersonNode } from '../utils/nodeUtils';
import { createEdge } from '../utils/edgeUtils';
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from '../utils/constants';
import { isPersonNodeType } from '../typeGuards/personTypeGuards';
import { useRecoilValue } from 'recoil';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { updateSiblings } from '@/utils/updateSiblings';
import { updateChildren } from '@/utils/updateChildren';
import { getMaritalPosition } from '@/utils/getMaritalPosition';
import { updateSpouseAndChildren } from '@/utils/updateSpouseAndChildren';

export const useAddChildToSelectedNode = (
  nodeList: (PersonNodeType | MaritalNodeType)[],
  edgeList: Edge[],
  selectedNode: PersonNodeType | undefined,
) => {
  const outgoingEdges = useOutgoingEdges(edgeList);
  const [localNodes, setLocalNodes] = useState(nodeList);
  const [localEdges, setLocalEdges] = useState(edgeList);

  const addChildToSelectedNode = () => {
    if (!selectedNode || !isPersonNodeType(selectedNode)) return;

    let selectedNodeMaritalPosition = getMaritalPosition(selectedNode);
    let maritalNodeId: PersonNodeType['id'];
    let spouseID: PersonNodeType['id'] = selectedNode.data.spouse[0] || '';
    if (!selectedNode.data.spouse.length) {
      const maritalNode = createMaritalNode({
        x: selectedNode.position.x + BASE_MARITAL_SPACING,
        y: selectedNode.position.y,
      });
      maritalNodeId = maritalNode.id;
      const spouseNode = createPersonNode(
        { x: selectedNode.position.x + BASE_MARITAL_SPACING * 2, y: selectedNode.position.y },
        {
          spouse: [selectedNode.id],
          maritalNodeId: maritalNodeId,
          maritalPosition: selectedNodeMaritalPosition === 'left' ? 'right' : 'left',
        }
      );
      spouseID = spouseNode.id;
      setLocalNodes((prevNodes) => [...prevNodes, maritalNode, spouseNode]);
      setLocalEdges((prevEdges) => [
        ...prevEdges,
        createEdge(selectedNode.id, maritalNodeId, 'smoothstep', 'personSourceRight', 'maritalTargetLeft'),
        createEdge(spouseID, maritalNodeId, 'smoothstep', 'personSourceLeft', 'maritalTargetRight'),
      ]);
    } else {
      maritalNodeId = outgoingEdges.find((edge) => edge.sourceHandle === 'personSourceRight' || edge.sourceHandle === 'personSourceLeft')?.target || '';
    }

    const childNode = createPersonNode(
      { x: selectedNode.position.x + BASE_MARITAL_SPACING, y: selectedNode.position.y + BASE_GENERATIONS_SPACING },
      { parents: [selectedNode.id, spouseID], siblings: [...selectedNode.data.children] }
    );
    childNode.data.siblings?.push(childNode.id);

    setLocalNodes((prevNodes) =>
      prevNodes
        .map((node) => {
          if (isPersonNodeType(node)) {
            if (node.id === spouseID) {
              return updateChildren(node, childNode.id);
            } else if (node.id === selectedNode.id) {
              return updateSpouseAndChildren(node, spouseID, childNode.id, maritalNodeId, selectedNodeMaritalPosition);
            } else if (selectedNode.data.children.includes(node.id)) {
              return updateSiblings(node, selectedNode.data.children, childNode.id);
            }
          }
          return node;
        })
        .concat([childNode])
    );

    setLocalEdges((prevEdges) => [...prevEdges, createEdge(childNode.id, maritalNodeId, 'parentChild', 'personSourceTop', 'maritalTargetBottom')]);
  };

  return {addChildToSelectedNode, localNodes, localEdges};
};
