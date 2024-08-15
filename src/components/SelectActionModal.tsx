import { FC, memo, useEffect, useReducer, useState } from 'react';
import { ProfileEditor } from './ProfileEditor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { useAddParentToSelectedNode } from '../hooks/useAddParentToSelectedNode';
import { addChildNodeToSelectedNode } from '../utils/addChildNodeToSelectedNode';
import { useAddSpouseToSelectedNode } from '../hooks/useAddSpouseToSelectedNode';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { wholeEdgesState } from '../recoil/WholeEdgesState';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import { Button, Flex, Grid } from '@chakra-ui/react';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { Edge } from 'reactflow';

type SelectActionModalProps = {
  closeModal: () => void;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void;
};

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  column-gap: 1rem;
  row-gap: 1.2rem;
`;

const StyledButton = styled.button`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  border: none;
  line-height: 1.2;
  border-radius: 0.375rem;
  font-weight: 600;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 200ms;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 1rem;
  padding-inline: 1rem;
  background: #edf2f7;
  color: #1a202c;
  cursor: pointer;

  @media (hover) {
    &:hover {
      background-color: #e2e8f0;
    }
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ModalBody = styled.div`
  padding-inline: 2.5rem;
  padding-block: 5rem 3rem;
  flex: 1 1 0%;
  position: relative;
`;

const CloseButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  padding: 3px;
  border-radius: 4px;
  right: 0.7rem;
  top: 0.5rem;
  cursor: pointer;
  line-height: 0;
  transition: background-color 300ms;
  @media (hover) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
`;

export const SelectActionModal: FC<SelectActionModalProps> = memo(function SelectActionModalComponent(props) {
  const { closeModal, updateFamilyTree } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [showProfileEditor, setShowProfileEditor] = useRecoilState(ProfileEditorState);
  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setWholeEdges);
  const { addSpouseToSelectedNode, localNodes: spouseLocalNodes, localEdges: spouseLocalEdges } = useAddSpouseToSelectedNode(wholeNodes, wholeEdges, selectedNode);

  const updateNodesAndEdges = (AddedNode: 'parent' | 'child' | 'spouse') => {
    switch (AddedNode) {
      case 'parent':
        break;
      case 'child':
        const {nodesCopy, edgesCopy} = addChildNodeToSelectedNode(wholeNodes, wholeEdges, selectedNode);
        updateFamilyTree(nodesCopy, edgesCopy);
        break;
      case 'spouse':
        break;
      default:
        break;
    }
  }

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  const closeAndInitModal = () => {
    closeModal();
    setShowProfileEditor(false);
  };

  let hasParents = false;
  let hasSpouse = false;
  if (selectedNode) {
    hasParents = !!selectedNode.data.parents.length;
    hasSpouse = !!selectedNode.data.spouse.length;
  }

  return (
    <>
      <ModalBody>
        <CloseButton onClick={closeAndInitModal}>
          <IoCloseOutline size={25} color='currentColor' />
        </CloseButton>
        {showProfileEditor ? (
          <ProfileEditor onClose={closeAndInitModal} />
        ) : (
          <>
            <Grid templateColumns='repeat(2, 1fr)' gap={5}>
              <Button
                isDisabled={hasParents}
                onClick={() => {
                  addParentToSelectedNode();
                  closeModal();
                }}
              >
                親を追加
              </Button>
              <Button
                onClick={() => {
                  updateNodesAndEdges('child');
                  closeModal();
                }}
              >
                子を追加
              </Button>
              <Button
                isDisabled={hasSpouse}
                onClick={() => {
                  addSpouseToSelectedNode();
                  closeModal();
                }}
              >
                配偶者を追加
              </Button>
              <Button
                onClick={() => {
                  displayProfileEditor();
                }}
              >
                情報を編集
              </Button>
            </Grid>
          </>
        )}
      </ModalBody>
    </>
  );
});
