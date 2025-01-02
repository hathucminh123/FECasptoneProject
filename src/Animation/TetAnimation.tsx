import React from 'react';
import Lottie from 'react-lottie';
import { useInView } from 'react-intersection-observer';
import tetAnimation from '../lotties/Tet.json';

const TetAnimation: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: tetAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                zIndex: -100,
            }}
        >
            {inView && (
                <Lottie
                    options={defaultOptions}
                    height={250}
                    width={100}
                    isClickToPauseDisabled
                />
            )}
        </div>
    );
};

export default TetAnimation;
