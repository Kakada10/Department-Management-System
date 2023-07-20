// @ts-nocheck

import React , {useState} from 'react';
import './scanner.css';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import axios from "axios";

const QrScanner = () => {
    var now = new Date();
    const currentPath = window.location.pathname.substr(24)
    const onNewScanResult = async (decodedText, decodedResult) => {
        console.log(`App [result], ${decodedText}`, decodedResult);  
        axios.post("http://localhost:3000/teacher/record/attendance",{attend: 'true' , session_id: currentPath, student_id: decodedText, time: now.getHours()+':'+now.getMinutes()},{ withCredentials: true })
            .then((result) => {
                alert("Student ID "+decodedText+" record attendent successfully!")
                })
            .catch(error => console.log(error));
        
    };
    return (
        <div className="App">
        {/* <div style={{height: '50%'}}> */}
            <section className="App-section">
            {/* <section style={{background: '#83bdef', display: 'flex', }}> */}
                <div className="App-section-title"> Session's Qrcode</div>
                <br />
                <br />
                <br />
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
        </div>
    );
};

export default QrScanner;
