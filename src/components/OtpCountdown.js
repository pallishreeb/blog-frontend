import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { API_URL } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
function OtpCountdown({ secondsLeft, setSecondsLeft }) {
   

    useEffect(() => {
        let interval = null;
        if (secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const resendOtp = async () =>{
        try {
            const email = localStorage.getItem("emailToVerify")
            if(email){
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                const res = await axios.post(`${API_URL}/user/sendOtp`, {email});
                console.log(res.data.message);
                setSecondsLeft(120)
            }  
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Try agan after sometime")
        }
       
    }
    return (
        <div>
            {
                secondsLeft === 0 ? <Button type="link" onClick={resendOtp} className='resend_btn'>Resend OTP</Button>  
                    : <p className='timer'>OTP will expire in: {formatTime(secondsLeft)}</p>     }
            
        </div>
    );
}

export default OtpCountdown;