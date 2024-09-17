import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Custom hook to manage redirection after login
export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = localStorage.getItem('auth');



  useEffect(() => {
    if (auth) {
   
      navigate(location.pathname, { replace: true });
    }
  }, [auth, location, navigate]);
};


