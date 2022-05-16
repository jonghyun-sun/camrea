const socket = io()


// // //비디오 파트
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras")

 
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras(){
  try{
    const devices = await navigator.mediaDevices.enumerateDevices()//나한테 연결된 장치들 정보 가져오기
    const cameras = devices.filter(device=> device.kind === "videoinput") //내 카메라 정보 가져오기
    cameras.forEach(camera =>{

    })
    // const option = document.createElement("option")//적용이 안되서 주석처리 해놨음 중요한거 x
    // option.value = camera.deviceId
    // console.log("option은",option)
    // option.innerText = camera.label
    // cameraSelect.appendChild(option)//카메라 정보를 라벨로 보이게 해주기
     
  }catch(e){
    console.log(e)
  }
}
 
async function getMedia(){ //카메라 오디오 켜기 
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
    await getCameras()
  } catch (e) {
    console.log(e);
  }
}


function handleMuteClick(){//버튼 누르면 바꿔주기
  console.log(myStream.getAudioTracks()) //마이크 정보등 나옴
  myStream
    .getAudioTracks()
    .forEach((track)=>(track.enabled=!track.enabled))// => 마이크 버튼 누를 때마다 켜고 끄기
   
  if(!muted){
    muteBtn.innerText = "Unmute"
    muted = true
  }else{
    muteBtn.innerText = "Mute"
    muted = false
  }
}
function handleCameraClick(){
  myStream
    .getVideoTracks()
    .forEach((track)=>(track.enabled=!track.enabled)) //
  if(cameraOff){
    cameraBtn.innerText = "Turn Camera Off" 
  }else{
    cameraBtn.innerText = "Turn Camera On"
  }
}

getMedia();

muteBtn.addEventListener("click",handleMuteClick)
cameraBtn.addEventListener("click",handleCameraClick)