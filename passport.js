import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import routes from "./router";
import { facebookLoginCallback, githubLoginCallback } from "./Controllers/userController";
import User from "./models/User";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    redirect_url: `http://localhost:4000/${routes.githubCallback}`
},
githubLoginCallback
))

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://d68633a004fa.ngrok.io${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile','email']
},
facebookLoginCallback

))

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//     done(err, user);
//     });
//     });