import { FC, memo, useEffect, useReducer, useRef, useState } from 'react';
import { ProfileEditor } from './ProfileEditor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { addChildNodeToSelectedNode } from '../utils/addChildNodeToSelectedNode';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { wholeEdgesState } from '../recoil/WholeEdgesState';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import { Button, Flex, Grid, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { Edge } from 'reactflow';
import { addParentToSelectedNode } from '@/utils/addParentToSelectedNode';
import { addSpouseToSelectedNode } from '@/utils/addSpouseToSelectedNode';
import { deleteNode } from '@/utils/deleteNode';
import { AlertDialogButton } from './ui/AlertDialogButton';
import { on } from 'events';

type SelectActionModalProps = {
  closeModal: () => void;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[], selectedNode: PersonNodeType | undefined) => void,
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(function SelectActionModalComponent(props) {
  const { closeModal, updateFamilyTree } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const [showProfileEditor, setShowProfileEditor] = useRecoilState(ProfileEditorState);
  const {isOpen, onOpen, onClose: onCloseAlert } = useDisclosure();

  const updateNodesAndEdges = (AddedNode: 'parent' | 'child' | 'spouse') => {
    switch (AddedNode) {
      case 'parent':
        const { nodesCopy: nodesCopyParent, edgesCopy: edgesCopyParent } = addParentToSelectedNode(
          wholeNodes,
          wholeEdges,
          selectedNode
        );
        updateFamilyTree(nodesCopyParent, edgesCopyParent, selectedNode);
        break;
      case 'child':
        const { nodesCopy: nodesCopyChild, edgesCopy: edgesCopyChild } = addChildNodeToSelectedNode(
          wholeNodes,
          wholeEdges,
          selectedNode
        );
        updateFamilyTree(nodesCopyChild, edgesCopyChild, selectedNode);
        break;
      case 'spouse':
        const { nodesCopy: nodesCopySpouse, edgesCopy: edgesCopySpouse } = addSpouseToSelectedNode(
          wholeNodes,
          wholeEdges,
          selectedNode
        );
        updateFamilyTree(nodesCopySpouse, edgesCopySpouse, selectedNode);
        break;
      default:
        break;
    }
  };

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  const closeAndInitModal = () => {
    closeModal();
  };

  let hasParents = false;
  let hasSpouse = false;
  if (selectedNode) {
    hasParents = !!selectedNode.data.parents.length;
    hasSpouse = !!selectedNode.data.spouse.length;
  }

  return (
    <>
    <ModalOverlay />
    <ModalContent p={5}>
      <ModalHeader>詳細情報を編集中<ModalCloseButton /></ModalHeader>
      <ModalBody>
      {showProfileEditor ? (
        <ProfileEditor onClose={closeAndInitModal} updateFamilyTree={updateFamilyTree} />
      ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Button
              isDisabled={hasParents}
              onClick={() => {
                updateNodesAndEdges('parent');
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
                updateNodesAndEdges('spouse');
                closeModal();
              }}
            >
              配偶者を追加
            </Button>
            <Button
              onClick={onOpen}
              >
              削除
            </Button>
            <AlertDialogButton isOpen={isOpen} onCloseAlert={onCloseAlert} closeModal={closeModal} updateFamilyTree={updateFamilyTree} />
            <Button
              onClick={() => {
                displayProfileEditor();
              }}
            >
              情報を編集
            </Button>
          </Grid>
      )}
      </ModalBody>
    </ModalContent>
    </>
  );
});
