const webcamElement = document.getElementById('webcam');
const webcam = new Webcam(webcamElement, 'user');
const modelPath = 'models';
let currentStream;
let displaySize;

webcam.start()
  .then(result => {
    cameraStarted();
    webcamElement.style.transform = "";
    console.log("webcam started");
    loadFaceDetectionModel();
  })
  .catch(err => {
    displayError(err);
  });

$("#webcam").bind("loadedmetadata", function () {
  displaySize = { width: this.scrollWidth, height: this.scrollHeight }
});

function loadFaceDetectionModel() {
  Promise.all([
    faceapi.nets.tinyFaceDetector.load(modelPath),
    faceapi.nets.faceLandmark68TinyNet.load(modelPath),
    faceapi.nets.faceExpressionNet.load(modelPath),
    faceapi.nets.ageGenderNet.load(modelPath)
  ]).then(startDetection)
}
const popupContainer = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', ()=>{
  popupContainer.classList.remove('active');
})
function showPopup(message){
    document.getElementById('popup-text').innerHTML = message;
    popupContainer.classList.add('active');
}
function startDetection(){
  faceDetection = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(webcamElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true).withFaceExpressions().withAgeAndGender()
    if (detections.length > 1) {
      showPopup("Multiple people detected in the camera!");
    }
  }, 300)
}

function cameraStarted(){
  if (webcam.webcamList.length > 1) {
    $("#cameraFlip").removeClass('d-none');
  }
}

function displayError(err = ''){
  if(err!=''){
      alert(err);
  }
  $("#errorMsg").removeClass("d-none");
}