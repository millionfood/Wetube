import express from "express";
import { getChangePassword, getEditProfile, postChangePassword, postEditProfile, userDetail, users } from "../Controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleware";
import routes from "../router"

const userRouter = express.Router();

userRouter.get(routes.home,users)
userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar,postEditProfile);

userRouter.get(routes.changePassword,onlyPrivate,getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword);

userRouter.get(routes.userDetail(),userDetail);


export default userRouter;
