import { FC, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import { MaritalNodeType, PersonNodeType } from '../types/PersonNodeType';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { ProfileTextInput } from './forms/ProfileTextInput';
import { Button, HStack } from '@chakra-ui/react';
import { ProfileGenderInput } from './forms/ProfileGenderInput';
import { ProfileBirthInput } from './forms/ProfileBirthInput';
import { ProfileMediaInput } from './forms/ProfileMediaInput';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { Edge } from 'reactflow';
import { wholeEdgesState } from '@/recoil/WholeEdgesState';
import { updateNodeData } from '@/utils/updateNodeData';

type ProfileEditorProps = {
  onClose: () => void;
  updateFamilyTree: (nodes: (PersonNodeType | MaritalNodeType)[], edges: Edge[]) => void;
};

export const ProfileEditor: FC<ProfileEditorProps> = memo(function ProfileEditorComponent(props) {
  const { onClose, updateFamilyTree } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileEditorInputs>();
  const wholeNodes = useRecoilValue(wholeNodesState);
  const wholeEdges = useRecoilValue(wholeEdgesState);
  const wholeNodesCopy = [...wholeNodes];
  const wholeEdgesCopy = [...wholeEdges];

  const onSubmit = async (data: ProfileEditorInputs) => {
    if (selectedNode) {
      console.log('submitData',data);
      const updatedNode = await updateNodeData(data, selectedNode);
      const updatedNodesCopy = wholeNodesCopy.map((node) => {
        return node.id === selectedNode.id ? updatedNode : node;
      });
      updateFamilyTree(updatedNodesCopy, wholeEdgesCopy);
    }
    onClose();
  };

  useEffect(() => {
    if (isPersonNodeType(selectedNode)) {
      const { lastName, firstName, birthYear, birthMonth, birthDate, gender, profilePictureURL } = selectedNode.data;
      setValue('lastName', lastName || '');
      setValue('firstName', firstName || '');
      setValue('birthYear', birthYear || new Date().getFullYear());
      setValue('birthMonth', birthMonth || 1);
      setValue('birthDate', birthDate || 1);
      setValue('gender', gender || '');
      setValue('profilePictureURL', profilePictureURL || '');
    }
  }, [selectedNode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <ProfileTextInput textValue='lastName' label='姓' register={register} errorMessage={errors.lastName?.message} />
        <ProfileTextInput textValue='firstName' label='名' register={register} errorMessage={errors.firstName?.message} />
      </HStack>
      <ProfileGenderInput register={register} genderValue='gender' />
      <ProfileBirthInput register={register} yearValue='birthYear' monthValue='birthMonth' dateValue='birthDate' />
      <ProfileMediaInput register={register} setValue={setValue} mediaValue='profilePictureURL' selectedNode={selectedNode} />

      <Button mt={4} isLoading={isSubmitting} type='submit'>
        保存する
      </Button>
    </form>
  );
});
