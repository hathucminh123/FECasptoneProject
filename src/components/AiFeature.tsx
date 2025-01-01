import React from "react";
// import LottieAnimation from '~/components/Lottie/LottieAnimation';
import { useNavigate } from "react-router-dom";
// import { ArrowRight } from 'lucide-react';
// import AxiosInterceptor from '~/components/api/AxiosInterceptor';
import styles from "./AiFeature.module.css";
import LottieAnimation from "./LottieAnimation";

const AiFeature: React.FC = () => {
  const navigate = useNavigate();

  // const backgroundImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const backgroundImageUrl = "https://images.unsplash.com/photo-1518307767271-9b6bb6f6f15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  // useEffect(() => {
  //     const fetchUserStatus = async () => {
  //         try {
  //             const response = await AxiosInterceptor.get("/api/users/current");
  //             setUserStatus(response.data.status);
  //         } catch (error) {
  //             console.error("Error fetching user status:", error);
  //         }
  //     };
  //     fetchUserStatus();
  // }, []);

  return (
    <div
      className={styles.aiFeature}
      // style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className={styles.aiFeatureCard}>
        <div className={styles.aiFeatureLeft}>
          <div className={styles.aiFeatureLottie}>
            <LottieAnimation />
          </div>
        </div>
        <div className={styles.aiFeatureRight}>
          <h1 className={styles.aiFeatureHeading}>
            Explore the job search feature using the chat box tool
          </h1>
          <p className={styles.aiFeatureDescription}>
            Searching for jobs has never been easier with our smart chatbox
            tool. Simply type in a few keywords describing your desired job,
            such as {" I want to find React In Ho Chi Minh "}, and the chatbox will analyze
            your requirements to present the most relevant job opportunities.
            The chatbox also supports keyword suggestions, filtering by skills,
            location, or salary, helping you quickly find the perfect job. Try
            it now to experience a modern, accurate, and fast way of job
            searching!
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("searchState");
              navigate("/ChatBox");
            }}
            // disabled={userStatus === 'Inactive'}
            className={`${styles.aiFeatureButton} ${styles.aiFeatureButtonActive}`}
            // title={
            //     userStatus === 'Inactive'
            //         ? 'Tài khoản của bạn hiện đang bị vô hiệu hóa'
            //         : ''
            // }
          >
            Try it now
            {/* <ArrowRight className={styles.aiFeatureButtonIcon} /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiFeature;
