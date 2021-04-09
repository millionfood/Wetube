const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObj;
let videoRecorder;

const handleVideoData = event =>{
    const {data:videoFile} = event;
    const link = document.createElement("a");
    link.href =URL.createObjectURL(videoFile);
    link.download = "rocorded.webm";
    document.body.appendChild(link);
    link.click();
    // console.log(videoFile)
}

const stopRecording = () =>{
    videoRecorder.stop();
    recordBtn.removeEventListener("click",stopRecording);
    recordBtn.addEventListener("click",getVideo);
    recordBtn.innerHTML = "Start recording";
}

const startRecording = () =>{
    videoRecorder = new MediaRecorder(streamObj);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable",handleVideoData);
    recordBtn.addEventListener("click",stopRecording);
}



const getVideo = async() =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{width:1280, height:720}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        streamObj = stream;
        recordBtn.innerHTML = 'stop recording';
        startRecording();
    }catch(error){
        console.log(error)
        recordBtn.innerHTML = "Can't record"
        recordBtn.removeEventListener("click",startRecording);
    }finally{
        recordBtn.removeEventListener("click",getVideo);

    }
}

function init(){
    recordBtn.addEventListener("click",getVideo)
}

if(recorderContainer){
    init();
}
