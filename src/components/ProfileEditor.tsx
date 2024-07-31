import { FC, FormEvent, memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfilePictureUpload } from '../hooks/useProfilePictureChange';
import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../recoil/WholeNodesState';
import { nodesUpdatedState } from '../recoil/nodesUpdatedState';
import { selectedNodeState } from '../recoil/selectedNodeState';
import styled from 'styled-components';
import { IoChevronDown } from 'react-icons/io5';
import { PersonNodeType } from '../types/PersonNodeType';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { ProfileTextInput } from './forms/ProfileTextInput';
import { Button, HStack } from '@chakra-ui/react';
import { ProfileGenderInput } from './forms/ProfileGenderInput';
import { ProfileBirthInput } from './forms/ProfileBirthInput';
import { ProfileMediaInput } from './forms/ProfileMediaInput';
import { isPersonNodeType } from '@/typeGuards/personTypeGuards';

type ProfileEditorProps = {
  onClose: () => void;
};

export const ProfileEditor: FC<ProfileEditorProps> = memo(function ProfileEditorComponent(props) {
  const { onClose } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileEditorInputs>();
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  const updateNodeData = (data: ProfileEditorInputs, selectedNode: PersonNodeType): Promise<PersonNodeType> => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        ...data,
        profilePictureURL: data.profilePicture instanceof File ? URL.createObjectURL(data.profilePicture) : undefined,
      },
    };
    return new Promise(function (resolve) {
      resolve(updatedNode);
    });
  };

  const onSubmit = async (data: ProfileEditorInputs) => {
    if (selectedNode) {
      const updatedNode = await updateNodeData(data, selectedNode);
      setWholeNodes((prevNodes) =>
        prevNodes.map((node) => {
          return node.id === selectedNode.id ? updatedNode : node;
        })
      );
    }
    onClose();
    setNodesUpdated(true);
  };

  useEffect(() => {
    if (isPersonNodeType(selectedNode)) {
      const { lastName, firstName, birthYear, birthMonth, birthDate, gender, profilePicture } = selectedNode.data;
      setValue('lastName', lastName || '');
      setValue('firstName', firstName || '');
      setValue('birthYear', birthYear || new Date().getFullYear());
      setValue('birthMonth', birthMonth || 1);
      setValue('birthDate', birthDate || 1);
      setValue('gender', gender || '');
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
      <ProfileMediaInput register={register} setValue={setValue} mediaValue='profilePicture' selectedNode={selectedNode} />

      <Button mt={4} isLoading={isSubmitting} type='submit'>
        保存する
      </Button>
    </form>
  );
});
