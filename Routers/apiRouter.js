import express from "express";
import routes from "../router"
import {postAddComment, postDeleteComment, postRegisterView} from "../Controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView,postRegisterView);
apiRouter.post(routes.addComment,postAddComment);
apiRouter.post(routes.deleteComment,postDeleteComment)



export default apiRouter;
