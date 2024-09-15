import { FC, memo } from 'react';
import 'reactflow/dist/style.css';
import { SelectActionModal } from './SelectActionModal';
import { FamilyTreeWrapper } from './FamilyTreeWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import { useInitFamilyTree } from '@/hooks/useInitFamilyTree';
import { Center, CircularProgress, Modal, Text, useDisclosure, VStack } from '@chakra-ui/react';

export const FamilyTree: FC = memo(function FamilyTreeComponent() {
  const setShowProfileEditor = useSetRecoilState(ProfileEditorState);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setShowProfileEditor(false);
    },
  });

  const { isLoading, projectId, nodes, edges, onNodesChange, onEdgesChange, onUpdate, updateFamilyTree } =
    useInitFamilyTree();

  return (
    <>
      {isLoading ? (
        <Center minHeight="100vh">
          <VStack>
            <CircularProgress isIndeterminate color="blue.600" />
            <Text mt={3}>家系図を描画しています。</Text>
          </VStack>
        </Center>
      ) : (
        <FamilyTreeWrapper
          projectId={projectId}
          openModal={onOpen}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          updateFamilyTree={updateFamilyTree}
          onUpdate={onUpdate}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <SelectActionModal closeModal={onClose} updateFamilyTree={updateFamilyTree} />
      </Modal>
    </>
  );
});
