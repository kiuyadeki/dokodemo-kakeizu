import { FC, memo, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { SelectActionModal } from './SelectActionModal';
import { UseMicroModal } from '@/hooks/useMicromodal';
import { FamilyTreeWrapper } from './FamilyTreeWrapper';
import { useRecoilState } from 'recoil';
import { ProfileEditorState } from '@/recoil/profileEditorState';

interface FamilyTreeProps {
  projectId: string | string[] | undefined;
}

export const FamilyTree: FC<FamilyTreeProps> = memo(function FamilyTreeComponent({ projectId }) {
  const [showProfileEditor, setShowProfileEditor] = useRecoilState(ProfileEditorState);
  const { Modal, open, close } = UseMicroModal('select-action-modal', () => {
    setShowProfileEditor(false);
  });

  return (
    <ReactFlowProvider>
      <FamilyTreeWrapper openModal={open} />
      <Modal>
        <SelectActionModal closeModal={close} />
      </Modal>
    </ReactFlowProvider>
  );
});
