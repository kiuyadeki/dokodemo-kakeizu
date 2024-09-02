import { getUrl, uploadData } from "@aws-amplify/storage";
import { fetchUserAttributes } from "aws-amplify/auth";

export const putProfilePictureToS3 = async (file: File) => {
  try {
    const user = await fetchUserAttributes();
    const fileName = `${Date.now()}_${file.name}`;
    const operation = uploadData({
      path: `profilePictures/${user.sub}/${fileName}`,
      data: file,
      options: {
        contentType: file.type,
      }
    });
    const result = await operation.result;
    console.log('S3 result',result);
    const uploadedImageObject = await getUrl({
      path: result.path,
    });
    console.log('image url', uploadedImageObject);
    return uploadedImageObject['url'].href;

  } catch (error) {
    throw new Error('画像のアップロードに失敗しました');
  }
}