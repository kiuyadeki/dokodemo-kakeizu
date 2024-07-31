import { useProfilePictureUpload } from "@/hooks/useProfilePictureChange";
import { PersonNodeType } from "@/types/PersonNodeType";
import { ProfileEditorInputs } from "@/types/profileEditorInputs";
import { Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import { FC, memo, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface MediaInputProps {
  mediaValue: string;
  setValue: UseFormSetValue<ProfileEditorInputs>;
  register: UseFormRegister<FieldValues>;
  selectedNode: PersonNodeType;
}

export const ProfileMediaInput: FC<MediaInputProps> = memo(({register, setValue, mediaValue, selectedNode}) => {

  const { uploadedImage, handleImageChange } = useProfilePictureUpload();
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event);
    const file = event.target.files ? event.target.files[0] : undefined;
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImageURL(previewURL);
    } else {
      setPreviewImageURL(null);
    }
    setValue('profilePicture', file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (selectedNode) {
      const { profilePicture } = selectedNode.data;
      if (profilePicture) {
        setValue('profilePicture', profilePicture || '');
        const previewURL = typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture);
        setPreviewImageURL(previewURL);
      }
    }
  }, [selectedNode, setValue])

  return (
    <FormControl>
      <FormLabel mt={6}>写真</FormLabel>
      <Input
      type="file"
        accept='image/*'
        {...register(mediaValue, {
          onChange: onFileInputChange,
        })}
        hidden
        ref={inputRef}
      />
      <Button type='button' onClick={handleButtonClick}>
        {previewImageURL ? '写真を変更' : '写真を選択'}
      </Button>
      {previewImageURL && (
          <Image mt={6} src={previewImageURL} alt="プレビュー画像" />
      )}
      {uploadedImage && !previewImageURL && (
          <Image mt={6} src={uploadedImage} alt="アップロードされた画像" />
      )}
    </FormControl>
  );
});

ProfileMediaInput.displayName = 'ProfileMediaInput';