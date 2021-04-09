import routes from '../router';
import Video  from '../models/Video';
import Comment from "../models/Comment";

export const home = async(req,res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render('home',{pageTitle:'home',videos});
    }catch(error){
        console.log(error);
        res.render('home',{pageTitle:'home',videos:[]});
    }
};
export const search = async(req,res) => {
    const {query:{term:searchingBy}} =req;
    // = const searchingBy = req.query.term
    let videos =[];
    try{
        videos = await Video.find({title: {$regex: searchingBy, $options: 'i'}});
    }catch(error){
       console.log(error);
    }
    res.render('search',{searchingBy,videos});

}

export const getUpload =(req,res) => {
    res.render('upload');
};
export const postUpload = async(req,res) => {
    const { 
        body: { title,description }, 
        file: { path }
    } = req;
    const newVideo =  await Video.create({
        fileUrl : path,
        title,
        description,
        creator: req.user.id
    });
    console.log(newVideo)
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(`${routes.videos}${routes.videoDetail(newVideo.id)}`);
   
};
export const videoDetail = async(req,res) => {
    const {params:{id},user} = req;
    try{
        const video = await (await Video.findById(id).populate("creator").populate("comments"));
        res.render('videoDetail',{pageTitle:video.title,video,user});
    }catch(error){
        console.log(`find Error:${error}`);
        res.redirect(routes.home);

    }
};

export const getEditVideo =async(req,res) => {
    const {
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id)
        if(video.creator != req.user.id){
            throw Error();
        }else{
            res.render('editVideo',{video})
        }
    }catch(error){
        res.redirect(routes.home)
    }
    
}
export const postEditVideo =async(req,res) => {
    const {params:{id},
            body:{title,description}
        }=req;
    try{
        await Video.findOneAndUpdate({_id:id},{title,description});
        res.redirect(`${routes.videos}${routes.videoDetail(id)}`);
    }catch(error){
        console.log(`Find Error:${error}`);
        res.redirect(routes.home)
    }
    
}
export const deleteVideo =async(req,res) => {
    const {
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id)
        if(video.creator != req.user.id){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
        }
       
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home)
}

//Register Video View

export const postRegisterView =async(req,res)=>{
    const {params:{id}} =req
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(error){
        res.status(400);
        res.end();
    }finally{
        res.end();
    }
}

export const postAddComment = async(req,res) =>{
    const {params:{id},body:{comment},user} =req
    console.log(req.params)
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        })
        video.comments.push(newComment.id);
        video.save()
    }catch(error){
        res.status(400)
    }finally{
        res.end()
    }
}

export const postDeleteComment = async(req,res) =>{
    const {params:{id},body:{comment}} =req;
    const commentValue = comment.split("\n")[0]
    try{
        console.log(`backend is working`)
        const video = await Video.findById(id)
        await Comment.findByIdAndRemove(commentValue)
        const videoCommentLocation = video.comments.indexOf(commentValue)
        video.comments.splice(videoCommentLocation,1)
        video.save()
    }catch(error){
        console.log(`error:${error}`)
    }
    res.send('hello')
}
