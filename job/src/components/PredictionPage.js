// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function PredictionPage() {
//   const location = useLocation();
//   const { image } = location.state;
//   const navigate = useNavigate();

//   const goToFilterPage = () => {
//     // Replace 'https://example.com' with the actual external URL
//     window.open('https://demo-mauve-mu.vercel.app/', '_blank');
//   };

//   return (
//     <div>
//       <h1>Prediction Page</h1>
//       <img src={image} alt="Captured Image" />
//       <button onClick={goToFilterPage}>Filter Page</button>
//       {/* Add prediction logic here */}
//     </div>
//   );
// }

// export default PredictionPage;


//serverside



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './prediction.css'; 

function PredictionPage() {
  const location = useLocation();
  const { image } = location.state;
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('http://localhost:3001/htmlContent');// Replace with your server URL
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  const goToFilterPage = () => {
    window.location.href = 'http://localhost:3001';
  };

  return (
    <div>
     <div className="prediction-container"></div>
      <img src={image} alt="Captured Image" className="fullscreen-image"/>
      {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>}
      
      <button onClick={goToFilterPage}>Filter Page</button>
      {/* Add prediction logic here */}
    
    </div>
  );
}

export default PredictionPage;
