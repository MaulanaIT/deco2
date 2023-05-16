import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function index() {
    return (
        <div style={{ paddingTop: 96, paddingBottom: 96 }}>
            <ReCAPTCHA sitekey='6LcWhFchAAAAALfnW6Yxxs5KrF0QKhXI-IH8jEgl' onChange={(e) => console.log(e)}>
            </ReCAPTCHA>
        </div>
    )
}
