// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
// import chatboxAnimation from '../lotties/Animation.json'; // Tệp JSON mới
import travelAnimation from '../lotties/TravalAnimation.json'; // Tệp JSON mới
const TravelAnimation:React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: travelAnimation, // Hoạt ảnh chatbox
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ cursor: 'default', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Lottie
                options={defaultOptions}
                height={150} // Chiều cao chatbox
                width={200}  // Chiều rộng chatbox
                style={{ cursor: 'default' }}
            />
        </div>
    );
};

export default TravelAnimation;
