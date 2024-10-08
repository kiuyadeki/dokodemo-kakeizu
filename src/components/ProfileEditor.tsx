import { FC, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { NodeData, PersonData } from '../types/NodeData';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { ProfileTextInput } from './forms/ProfileTextInput';
import { Button, HStack } from '@chakra-ui/react';
import { ProfileGenderInput } from './forms/ProfileGenderInput';
import { ProfileDateInput } from './forms/ProfileDateInput';
import { ProfileMediaInput } from './forms/ProfileMediaInput';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { Edge, Node } from 'reactflow';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { updateNodeData } from '@/utils/nodeOperations/updateNodeData';

type ProfileEditorProps = {
  onClose: () => void;
  updateFamilyTree: (nodes: Node<NodeData>[], edges: Edge[], selectedNode: Node<PersonData> | undefined) => void;
};

export const ProfileEditor: FC<ProfileEditorProps> = memo(function ProfileEditorComponent(props) {
  const { onClose, updateFamilyTree } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<ProfileEditorInputs>();
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const wholeNodesCopy = [...wholeNodes];
  const wholeEdgesCopy = [...wholeEdges];

  const onSubmit = async (data: ProfileEditorInputs) => {
    if (selectedNode) {
      const updatedNode = await updateNodeData(data, selectedNode);
      const updatedNodesCopy = wholeNodesCopy.map((node) => {
        return node.id === selectedNode.id ? updatedNode : node;
      });
      updateFamilyTree(updatedNodesCopy, wholeEdgesCopy, selectedNode);
    }
    onClose();
  };

  useEffect(() => {
    if (isPersonNodeType(selectedNode)) {
      const { familyName, givenName, birthDay, deathDay, gender, profilePictureURL } = selectedNode.data;
      setValue('familyName', familyName || '');
      setValue('givenName', givenName || '');
      setValue('birthDay', birthDay || undefined);
      setValue('deathDay', deathDay || undefined);
      setValue('gender', gender || '');
      setValue('profilePictureURL', profilePictureURL || '');
    }
  }, [selectedNode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <ProfileTextInput
          textValue="familyName"
          label="姓"
          register={register}
          errorMessage={errors.familyName?.message}
        />
        <ProfileTextInput
          textValue="givenName"
          label="名"
          register={register}
          errorMessage={errors.givenName?.message}
        />
      </HStack>
      <ProfileGenderInput
        control={control}
        genderValue="gender"
        defaultGender={selectedNode?.data?.gender || ''}
      />
      <HStack>
        <ProfileDateInput
          label="生年月日"
          register={register}
          dateValue="birthDay"
          control={control}
        />
        <ProfileDateInput
          label="没年月日"
          register={register}
          dateValue="deathDay"
          control={control}
        />
      </HStack>
      <ProfileMediaInput
        register={register}
        setValue={setValue}
        mediaValue="profilePictureURL"
        selectedNode={selectedNode}
      />

      <Button
        mt={4}
        isLoading={isSubmitting}
        type="submit"
      >
        保存する
      </Button>
    </form>
  );
});
