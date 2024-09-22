import { useProfilePictureUpload } from '@/hooks/useProfilePictureChange';
import { PersonNodeType } from '@/types/PersonNodeType';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';
import { getS3ImageUrl } from '@/utils/getS3ImageUrl';
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
  const { s3ImagePath, handleImageChange } = useProfilePictureUpload();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const existingProfilePictureURL = selectedNode?.data.profilePictureURL;
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (s3ImagePath) {
      setValue('profilePictureURL', s3ImagePath);
      getS3ImageUrl(s3ImagePath).then((sourceUrl) => {
        console.log('sourceUrl', sourceUrl);
        setImageUrl(sourceUrl);
      });
    }
  }, [s3ImagePath]);

  useEffect(() => {
    if (existingProfilePictureURL) {
      console.log('existingProfilePictureURL', existingProfilePictureURL);
      getS3ImageUrl(existingProfilePictureURL).then((sourceUrl) => {
        console.log('existingSourceUrl', sourceUrl);
        setExistingImageUrl(sourceUrl);
      });
    }
  }, []);

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
      <Button
        type="button"
        onClick={handleButtonClick}
      >
        写真を選択する
      </Button>
      {imageUrl && (
        <Image
          boxSize="300px"
          objectFit="cover"
          mt={6}
          src={imageUrl}
          alt="アップロードされた画像"
        />
      )}
      {!imageUrl && existingImageUrl && (
        <Image
          boxSize="300px"
          objectFit="cover"
          mt={6}
          src={existingImageUrl}
          alt="アップロードされた画像"
        />
      )}
    </FormControl>
  );
});

ProfileMediaInput.displayName = 'ProfileMediaInput';
