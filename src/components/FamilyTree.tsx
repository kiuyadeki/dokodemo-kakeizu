import { FC, memo, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { SelectActionModal } from './SelectActionModal';
import { UseMicroModal } from '@/hooks/useMicromodal';
import { FamilyTreeWrapper } from './FamilyTreeWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import { useInitFamilyTree } from '@/hooks/useInitFamilyTree';
import { useGetProjectId } from '@/hooks/useGetProjectId';
import { Center, Spinner } from '@chakra-ui/react';


export const FamilyTree: FC = memo(function FamilyTreeComponent() {
  const setShowProfileEditor = useSetRecoilState(ProfileEditorState);
  const { Modal, open, close } = UseMicroModal('select-action-modal', () => {
    setShowProfileEditor(false);
  });
  const {isLoading, nodes, edges, onNodesChange, onEdgesChange, onUpdate, updateFamilyTree } = useInitFamilyTree();

  return (
    <>
      {isLoading ? (
        <Center minHeight='100vh'>
          <Spinner size='lg' />
        </Center>
      ) : (
        <FamilyTreeWrapper openModal={open} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} updateFamilyTree={updateFamilyTree} onUpdate={onUpdate} />
      )}
      <Modal>
        <SelectActionModal closeModal={close} updateFamilyTree={updateFamilyTree} />
      </Modal>
    </>
  );
});
