import { FC, memo, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { SelectActionModal } from './SelectActionModal';
import { UseMicroModal } from '@/hooks/useMicromodal';
import { FamilyTreeWrapper } from './FamilyTreeWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ProfileEditorState } from '@/recoil/profileEditorState';
import { useInitFamilyTree } from '@/hooks/useInitFamilyTree';

interface FamilyTreeProps {
  projectId: string | undefined;
  familyTreeData: string | null | undefined;
}

export const FamilyTree: FC<FamilyTreeProps> = memo(function FamilyTreeComponent({ projectId, familyTreeData }) {
  useEffect(() => {
    if (familyTreeData) {
      console.log('familyTreeData', familyTreeData);
    }
  }, [familyTreeData]);
  const setShowProfileEditor = useSetRecoilState(ProfileEditorState);
  const { Modal, open, close } = UseMicroModal('select-action-modal', () => {
    setShowProfileEditor(false);
  });
  const { nodes, edges, onNodesChange, onEdgesChange, onUpdate, updateFamilyTree } = useInitFamilyTree();

  return (
    <>
      <FamilyTreeWrapper projectId={projectId} openModal={open} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} updateFamilyTree={updateFamilyTree} onUpdate={onUpdate} familyTreeData={familyTreeData} />
      <Modal>
        <SelectActionModal closeModal={close} updateFamilyTree={updateFamilyTree} />
      </Modal>
    </>
  );
});
