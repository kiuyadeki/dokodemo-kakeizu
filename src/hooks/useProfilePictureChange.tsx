import { putProfilePictureToS3 } from '@/utils/putProfilePictureToS3';
import { getUrl } from '@aws-amplify/storage';
import { ChangeEvent, useState } from 'react';

export const useProfilePictureUpload = () => {
  const [s3ImagePath, setS3ImagePath] = useState<string | undefined>(undefined);

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
          .then((imagePath) => {
            setS3ImagePath(imagePath);
          })
          .catch((error) => {
            console.error(error);
            setS3ImagePath(undefined);
          });
      }
    }
  };

  return { s3ImagePath, handleImageChange };
};
