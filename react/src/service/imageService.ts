import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";

export default {
  upload: (images: Array<File>) =>
    httpActions.post(API_ROUTES.productImage.upload, images),
  download: (imageId: number) =>
    httpActions.get(API_ROUTES.productImage.download(imageId)),
  update: (imageId: string, image: File) =>
    httpActions.put(API_ROUTES.productImage.update(imageId), image),
};
