import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";


function PracticeRoom2() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

//load posenet model here
const runPosenet = async ()=>{
  const net = await posenet.load({
    inputResolution:{width:640, height:480}, scale:0.5
  })
  setInterval(() => {
    detect(net);
  }, 1000);
};


const detect = async (net)=>{
  if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4){
    //vid properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Make Detections
    const pose = await net.estimateSinglePose(video);
    // console.log(pose);

drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  }
}

const drawCanvas = (pose, video, videoWidth, videoHeight, canvas)=>{
  const ctx = canvas.current.getContext("2d");
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;

  drawKeypoints(pose["keypoints"], 0.6, ctx);
  drawSkeleton(pose["keypoints"], 0.7, ctx);


}

runPosenet()

//setintervalfunction


  return (
    <div className="App">
      <header className="App-header">
       Your Practice
       <Webcam
       ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
        ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}
// const detect = async (net)=>{
//   if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4){
//     const video = webcamRef.current.video;
//     const videoWidth = webcamRef.current.video.videoWidth;
//     const videoHeight = webcamRef.current.video.videoHeight;

//     webcamRef.current.video.width = videoWidth;
//     webcamRef.current.video.height = videoHeight;
//     const poses = await net.estimateSinglePose(video);
//      const { pose, posenetOutput } = await model.estimatePose(poses);
//      const prediction = await model.predict(posenetOutput)
//      for (let i = 0; i < maxPredictions; i++) {
//       const classPrediction =
//           prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
//       labelContainer.childNodes[i].innerHTML = classPrediction;
//   }

// drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
//   }
// }

// const drawCanvas = (pose, video, videoWidth, videoHeight, canvas)=>{
//   const ctx = canvas.current.getContext("2d");
//   canvas.current.width = videoWidth;
//   canvas.current.height = videoHeight;

//   drawKeypoints(pose["keypoints"], 0.6, ctx);
//   drawSkeleton(pose["keypoints"], 0.7, ctx);
// }

// runPosenet()


export default PracticeRoom2;
