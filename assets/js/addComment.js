import axios from "axios";


const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList")
const commentNumber = document.getElementById("jsCommentNumber")
const deleteBtn = document.querySelectorAll(".video_comment_deleteBtn")

const increaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10)+1;
}

const decreaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10)-1;
}

const addComment = (comment) =>{
    const li = document.createElement("li")
    const span = document.createElement("span")
    const btn = document.createElement("div")
    btn.innerText='X'
    btn.className='video_comment_deleteBtn'
    span.innerHTML = comment;
    span.appendChild(btn)
    li.appendChild(span)
    commentList.prepend(li)
    increaseNumber()
}

const sendComment = async(comment) =>{
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url:`/api/${videoId}/comment`,
        method:"POST",
        data:{
            comment
        }
         
    })
    if(response.status == 200){
        addComment(comment)
    }
}

const deleteComment = element =>{
    const li = element.target.closest("#commentContainer")
    li.remove();
    decreaseNumber();
}

function handleSubmit(event){
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input")
    const comment = commentInput.value
    sendComment(comment)
    commentInput.value =  "";
}

const handleDelete = async(event) =>{
    const comment = event.target.parentNode.firstElementChild.value
    const videoId = window.location.href.split("/videos/")[1]
    const response = await axios({
        url:`/api/${videoId}/comment/delete`,
        method:'POST',
        data:{
            comment
        }
    })
    if(response.status == 200){
        deleteComment(event)
    }
}

function init(){
    addCommentForm.addEventListener("submit",handleSubmit)
    Array.from(deleteBtn).forEach(e=>e.addEventListener("click",handleDelete))
}

if(addCommentForm){
    init();
}