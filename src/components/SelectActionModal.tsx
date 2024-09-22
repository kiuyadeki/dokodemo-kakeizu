import { FC, memo, useState } from 'react';
import { ProfileEditor } from './ProfileEditor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { addChildNodeToSelectedNode } from '../utils/nodeOperations/addChildNodeToSelectedNode';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { wholeEdgesState } from '../recoil/WholeEdgesState';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import {
  Button,
  Flex,
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { MaritalNodeType, PersonNodeType } from '@/types/PersonNodeType';
import { Edge } from 'reactflow';
import { addParentToSelectedNode } from '@/utils/nodeOperations/addParentToSelectedNode';
import { addSpouseToSelectedNode } from '@/utils/nodeOperations/addSpouseToSelectedNode';
import { AlertModal } from './ui/AlertModal';
import { isDeletableNode } from '@/utils/nodeOperations/isDeletableNode';

type SelectActionModalProps = {
  closeModal: () => void;
  updateFamilyTree: (
    nodes: (PersonNodeType | MaritalNodeType)[],
    edges: Edge[],
    selectedNode: PersonNodeType | undefined
  ) => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(function SelectActionModalComponent(props) {
  const { closeModal, updateFamilyTree } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const [showProfileEditor, setShowProfileEditor] = useRecoilState(ProfileEditorState);
  const [isNodeDeletable, setIsNodeDeletable] = useState(false);
  const { isOpen, onOpen, onClose: onCloseAlert } = useDisclosure();

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

  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  const closeAndInitModal = () => {
    closeModal();
  };

  const handleAlertModal = () => {
    setIsNodeDeletable(isDeletableNode(wholeEdges, selectedNode));
    onOpen();
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
      <ModalContent
        p={6}
        maxHeight="calc(100% - 40px)"
        overflowY="auto"
      >
        <ModalHeader>
          詳細情報を編集中
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {showProfileEditor ? (
            <ProfileEditor
              onClose={closeAndInitModal}
              updateFamilyTree={updateFamilyTree}
            />
          ) : (
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={3}
            >
              <Button
                colorScheme="orange"
                onClick={() => {
                  displayProfileEditor();
                }}
              >
                情報を編集
              </Button>
              <Tooltip label="親がいない場合のみ追加できます">
                <Button
                  colorScheme="teal"
                  isDisabled={hasParents}
                  onClick={() => {
                    updateNodesAndEdges('parent');
                    closeModal();
                  }}
                >
                  親を追加
                </Button>
              </Tooltip>
              <Button
                colorScheme="teal"
                onClick={() => {
                  updateNodesAndEdges('child');
                  closeModal();
                }}
              >
                子を追加
              </Button>
              <Tooltip label="配偶者がいない場合のみ追加できます">
                <Button
                  colorScheme="teal"
                  isDisabled={hasSpouse}
                  onClick={() => {
                    updateNodesAndEdges('spouse');
                    closeModal();
                  }}
                >
                  配偶者を追加
                </Button>
              </Tooltip>
              <Button
                onClick={handleAlertModal}
                colorScheme="red"
              >
                削除
              </Button>
              <AlertModal
                isDeletable={isNodeDeletable}
                isOpen={isOpen}
                onCloseAlert={onCloseAlert}
                closeModal={closeModal}
                updateFamilyTree={updateFamilyTree}
              />
            </Grid>
          )}
        </ModalBody>
      </ModalContent>
    </>
  );
});
