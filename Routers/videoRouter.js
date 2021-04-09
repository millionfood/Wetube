import express from "express";
import { deleteVideo, home, postUpload, getUpload, videoDetail, getEditVideo, postEditVideo } from "../Controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middleware";
import routes from "../router"

const videoRouter = express.Router();

videoRouter.get(routes.home,home);

//Upload
videoRouter.get(routes.upload,onlyPrivate,getUpload);
videoRouter.post(routes.upload,onlyPrivate,uploadVideo,postUpload);


//VideoDetail
videoRouter.get(routes.videoDetail(),videoDetail);


//EditVideo
videoRouter.get(routes.editVideo(),onlyPrivate,getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate,postEditVideo);

//DeleteVideo
videoRouter.get(routes.deleteVideo(),onlyPrivate,deleteVideo);


export default videoRouter;