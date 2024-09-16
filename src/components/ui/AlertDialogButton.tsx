import { selectedNodeState } from "@/recoil/selectedNodeState";
import { wholeEdgesState } from "@/recoil/WholeEdgesState";
import { wholeNodesState } from "@/recoil/WholeNodesState";
import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";
import { deleteNode } from "@/utils/deleteNode";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { set } from "date-fns";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Edge } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";

type AlertModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onCloseAlert: () => void;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[], selectedNode: PersonNodeType | undefined) => void,
}

export const AlertDialogButton: FC<AlertModalProps> = memo((props) => {
  const { isOpen, closeModal, onCloseAlert, updateFamilyTree } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);

  const [isNodeDeleted, setIsNodeDeleted] = useState(false);
  const [updatedNodes, setUpdatedNodes] = useState<(PersonNodeType | MaritalNodeType)[]>([]);
  const [updatedEdges, setUpdatedEdges] = useState<Edge[]>([]);

  const handleDelete = () => {
    const { nodeList, edgeList } = deleteNode(wholeNodes, wholeEdges, selectedNode);
    setUpdatedNodes(nodeList);
    setUpdatedEdges(edgeList);

    const parentNode = wholeNodes.find((node) => node.id === selectedNode?.data.parents[0]);
    if (isPersonNodeType(parentNode)) {
      setSelectedNode(parentNode);
      updateFamilyTree(nodeList, edgeList, parentNode);
    }
    onCloseAlert();
    closeModal();
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCloseAlert} isCentered motionPreset="slideInBottom">
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          人物を削除
        </AlertDialogHeader>
        <AlertDialogBody>
          この操作は取り消せません。本当に人物を削除しますか？
        </AlertDialogBody>
        <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onCloseAlert}>キャンセル</Button>
        <Button colorScheme="red" ml={3} onClick={handleDelete}>削除する</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
    </AlertDialog>
  );
});

AlertDialogButton.displayName = 'AlertDialogButton';