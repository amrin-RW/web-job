// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function CameraPage() {
//   const videoRef = useRef(null);
//   const [stream, setStream] = useState(null);
//   const navigate = useNavigate();

//   const startCamera = async (facingMode) => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
//       setStream(mediaStream);
//       videoRef.current.srcObject = mediaStream;
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };

//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//   };

//   const capturePhoto = () => {
//     const video = videoRef.current;
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//     const photoData = canvas.toDataURL('image/jpeg');
//     stopCamera(); // Stop the camera after capturing the photo
//     navigate('/result', { state: { photoData } });
//   };

//   return (
//     <div>
//       <h1>Camera Page</h1>
//       <video ref={videoRef} autoPlay />
//       <div>
//         <button onClick={capturePhoto}>Capture Photo</button>
//         <button onClick={() => startCamera('user')}>Switch to Front Camera</button>
//         <button onClick={() => startCamera('environment')}>Switch to Back Camera</button>
//       </div>
//     </div>
//   );
// }

// export default CameraPage;


// serverpage


import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './campage.css'; 
import Image from './button.png'; 

function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Run only once on component mount

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/jpeg');

    // Navigate to the prediction page and pass the captured photo data as state
    navigate('/prediction', { state: { image: photoData } });
  };

  return (
    <div className="camera-container">
       <div className="navbar">
  
      </div>
      
      <video ref={videoRef} autoPlay className="fullscreen-video" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="capture-button">
        
      <img src={Image} alt="Capture" onClick={capturePhoto} />
      </div>
    </div>
  );
}

export default CameraPage;
