import { putProfilePictureToS3 } from '@/utils/putProfilePictureToS3';
import { ChangeEvent, useState } from 'react';

export const useProfilePictureUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > 5242880) {
        alert('ファイルサイズは5MB以下である必要があります');
        event.target.value = '';
        return;
      } else if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert('JPEGまたはPNG形式のファイルを選択してください。');
        event.target.value = '';
        return;
      } else {
        putProfilePictureToS3(file)
          .then((imageUrl) => {
            setUploadedImage(imageUrl);
            console.log('imageUrl', imageUrl);
          })
          .catch((error) => {
            console.error(error);
            setUploadedImage(undefined);
          });

        // const reader = new FileReader();
        // reader.onload = readEvent => {
        //   const result = readEvent.target?.result;
        //   if (typeof result === 'string') {
        //     setUploadedImage(result);
        //   }
        // };
        // reader.readAsDataURL(file);
      }
    }
  };

  return { uploadedImage, handleImageChange };
};
