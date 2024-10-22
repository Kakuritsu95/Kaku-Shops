import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";

export default {
  upload: (images: Array<File>) =>
    httpActions.post(API_ROUTES.image.upload, images),
  download: (imageId: number) =>
    httpActions.get(API_ROUTES.image.download(imageId)),
  update: (imageId: number, image: File) =>
    httpActions.put(API_ROUTES.image.update(imageId), image),
};
