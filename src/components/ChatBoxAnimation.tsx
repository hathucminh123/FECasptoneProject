// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import chatboxAnimation from '../lotties/ChatbotAnimation.json'; // Tệp JSON mới

const ChatBoxAnimation:React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: chatboxAnimation, // Hoạt ảnh chatbox
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ cursor: 'default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Lottie
                options={defaultOptions}
                height={450} // Chiều cao chatbox
                width={600}  // Chiều rộng chatbox
                style={{ cursor: 'default' }}
            />
        </div>
    );
};

export default ChatBoxAnimation;
