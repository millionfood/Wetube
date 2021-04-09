import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
// import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import {localsMiddleware} from "./middleware";
import routes from "./router";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import globalRouter from "./Routers/globalRouter";
import apiRouter from "./Routers/apiRouter";

import "./passport";

const app = express();

const MongoStore = require("connect-mongo")

// app.use(helmet());
app.use(helmet({contentSecurityPolicy:false}));
app.set('view engine','pug');
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
    );
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(localsMiddleware);

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
app.use(routes.api,apiRouter)

export default app;

