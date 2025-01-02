// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
// import chatboxAnimation from '../lotties/Animation.json'; // Tệp JSON mới
import tetAnimation from '../lotties/Tet.json'; // Tệp JSON mới
const TetAnimation:React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: tetAnimation, // Hoạt ảnh chatbox
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ cursor: 'default', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' ,zIndex:-100}}>
            <Lottie
                options={defaultOptions}
                height={250} // Chiều cao chatbox
                width={220}  // Chiều rộng chatbox
                style={{ cursor: 'default' }}
            />
        </div>
    );
};

export default TetAnimation;
