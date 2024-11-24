import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentCallback: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(location.search);

    // Extract relevant parameters
    const vnp_Amount = queryParams.get('vnp_Amount');
    const vnp_BankCode = queryParams.get('vnp_BankCode');
    const vnp_BankTranNo = queryParams.get('vnp_BankTranNo');
    const vnp_CardType = queryParams.get('vnp_CardType');
    // Add more parameters as needed

   
    console.log('Callback Parameters:', {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
    });
  }, [location.search]);

  return (
    <div>
      <h3>Processing payment callback...</h3>
    </div>
  );
};

export default PaymentCallback;
