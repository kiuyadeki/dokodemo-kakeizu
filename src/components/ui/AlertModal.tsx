import { selectedNodeState } from '@/recoil/selectedNodeState';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { wholeNodesState } from '@/recoil/WholeNodesState';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { NodeData, PersonData } from '@/types/NodeData';
import { deleteNode } from '@/utils/nodeOperations/deleteNode';
import { deleteNodeInfo } from '@/utils/nodeOperations/deleteNodeInfo';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { set } from 'date-fns';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';

type AlertModalProps = {
  isDeletable: boolean;
  isOpen: boolean;
  closeModal: () => void;
  onCloseAlert: () => void;
  updateFamilyTree: (
    nodes: Node<NodeData>[],
    edges: Edge[],
    selectedNode: Node<PersonData> | undefined
  ) => void;
};

export const AlertModal: FC<AlertModalProps> = memo((props) => {
  const { isDeletable, isOpen, closeModal, onCloseAlert, updateFamilyTree } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const [updatedNodes, setUpdatedNodes] = useState<Node<NodeData>[]>([]);
  const [updatedEdges, setUpdatedEdges] = useState<Edge[]>([]);

  const handleDeleteNode = () => {
    const { nodeList, edgeList } = deleteNode(wholeNodes, wholeEdges, selectedNode);
    setUpdatedNodes(nodeList);
    setUpdatedEdges(edgeList);

    let directNode: Node<NodeData> | undefined;
    if (selectedNode?.data.parents.length === 0) {
      directNode = wholeNodes.find((node) => node.id === selectedNode?.data.spouse[0]);
    } else {
      directNode = wholeNodes.find((node) => node.id === selectedNode?.data.parents[0]);
    }
    if (isPersonNodeType(directNode)) {
      setSelectedNode(directNode);
      updateFamilyTree(nodeList, edgeList, directNode);
    }
    onCloseAlert();
    closeModal();
  };

  const handleDeleteInfo = () => {
    const nodeList = deleteNodeInfo(wholeNodes, selectedNode);
    updateFamilyTree(nodeList, wholeEdges, selectedNode);
    setSelectedNode(selectedNode);
    onCloseAlert();
    closeModal();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
          >
            人物を削除
          </AlertDialogHeader>
          <AlertDialogBody>
            {isDeletable
              ? 'この操作は取り消せません。本当に人物を削除しますか?'
              : 'この人物は削除できません。代わりに情報のみを削除しますか?'}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onCloseAlert}
            >
              キャンセル
            </Button>
            {isDeletable ? (
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleDeleteNode}
              >
                削除する
              </Button>
            ) : (
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleDeleteInfo}
              >
                削除する
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
});

AlertModal.displayName = 'AlertModal';
