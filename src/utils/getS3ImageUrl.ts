import { getUrl } from '@aws-amplify/storage';

export const getS3ImageUrl = async (path: string) => {
  try {
    const imageUrlObject = await getUrl({
      path: path,
    });

    return imageUrlObject['url'].href;
  } catch (error) {
    console.error('画像の取得に失敗しました', error);
  }
};
