import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success"); // = true
  const orderId = searchParams.get("orderId"); // = id of placed order
  const navigate = useNavigate()

  console.log(success, orderId);

  const verifyPayment = async () => {
    const res = await axios.post("/api/order/verify", {success, orderId})
    if(res.data.success){
        navigate("/orders")
    }
    else {
        navigate("/")
        toast.error("Payment cancelled.")
    }
  }

  // to call function only when component loads
  useEffect(()=>{
    verifyPayment()
  },[])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
