import { useProfilePictureUpload } from '@/hooks/useProfilePictureChange';
import { PersonNodeType } from '@/types/PersonNodeType';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { Button, FormControl, FormLabel, Image, Input } from '@chakra-ui/react';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { FieldValues, set, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface MediaInputProps {
  mediaValue: string;
  setValue: UseFormSetValue<ProfileEditorInputs>;
  register: UseFormRegister<ProfileEditorInputs>;
  selectedNode: PersonNodeType | undefined;
}

export const ProfileMediaInput: FC<MediaInputProps> = memo(({ register, setValue, mediaValue, selectedNode }) => {
  const { uploadedImage, handleImageChange } = useProfilePictureUpload();
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const existingProfilePictureURL = selectedNode?.data.profilePictureURL;

  useEffect(() => {
    if (uploadedImage) {
      setPreviewImageURL(uploadedImage);
      setValue('profilePictureURL', uploadedImage);
    }
  }, [uploadedImage]);

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await handleImageChange(event);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <FormControl>
      <FormLabel mt={6}>写真</FormLabel>
      <Input
        type="file"
        accept="image/*"
        {...register('profilePictureFile', {
          onChange: onFileInputChange,
        })}
        hidden
        ref={inputRef}
      />
      <Button type="button" onClick={handleButtonClick}>
        {previewImageURL ? '写真を変更' : '写真を選択'}
      </Button>
      {uploadedImage && <Image mt={6} src={uploadedImage} alt="アップロードされた画像" />}
      {!uploadedImage && existingProfilePictureURL && (
        <Image mt={6} src={existingProfilePictureURL} alt="アップロードされた画像" />
      )}
    </FormControl>
  );
});

ProfileMediaInput.displayName = 'ProfileMediaInput';
