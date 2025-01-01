// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
// import chatboxAnimation from '../lotties/Animation.json'; // Tệp JSON mới
import chatboxAnimation from '../lotties/ChatbotAnimation.json'; // Tệp JSON mới
const LottieAnimation:React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: chatboxAnimation, // Hoạt ảnh chatbox
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ cursor: 'default', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
            <Lottie
                options={defaultOptions}
                height={400} // Chiều cao chatbox
                width={460}  // Chiều rộng chatbox
                style={{ cursor: 'default' }}
            />
        </div>
    );
};

export default LottieAnimation;
