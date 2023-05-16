// Import Library
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckInputValid, cx, InputFormatAlphabet, InputFormatNumber } from '../Helper';

// Import Assets
import IconCheck from '/public/assets/ic-check-circle.svg';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/question-result/follow_up.module.css';
import axios from 'axios';

export default function Follow_up({ close }) {

    const [getValueCaptcha, setValueCaptcha] = useState('');
    const [getValueFullName, setValueFullName] = useState('');
    const [getValueEmail, setValueEmail] = useState('');
    const [getValueOrganizationName, setValueOrganizationName] = useState('');
    const [getValuePhone, setValuePhone] = useState('');
    const [getValueCountryPhone, setValueCountryPhone] = useState('+62');

    const [getErrorCaptcha, setErrorCaptcha] = useState('');
    const [getErrorFullName, setErrorFullName] = useState('');
    const [getErrorEmail, setErrorEmail] = useState('');
    const [getErrorPhone, setErrorPhone] = useState('');

    const [getActiveValidation, setActiveValidation] = useState(false);

    const [getFollowingUp, setFollowingUp] = useState(false);

    const router = useRouter();

    useEffect(() => {
        ValidationFullName();
    }, [getValueFullName]);

    useEffect(() => {
        ValidationEmail();
    }, [getValueEmail]);

    useEffect(() => {
        ValidationPhone();
    }, [getValuePhone]);

    useEffect(() => {
        setActiveValidation(true);
    }, []);

    const FollowUp = async () => {
        await ValidationFullName();
        await ValidationEmail();
        await ValidationPhone();
        await ValidationCaptcha();

        if (CheckInputValid() && getValueCaptcha !== '') {
            const formData = new FormData();

            formData.append('survey_group_id', router.query.index[0]);
            formData.append('reference_number', router.query.index[1]);
            formData.append('member_email', getValueEmail);
            formData.append('member_fullname', getValueFullName);
            formData.append('member_country_phone', getValueCountryPhone);
            formData.append('member_phone', getValuePhone);
            formData.append('member_company_phone', getValueOrganizationName);

            axios.post(`${process.env.baseURL}/api/survey/follow_up`, formData, process.env.config).then(() => {
                setFollowingUp(true);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const ValidationCaptcha = async () => {
        if (getValueCaptcha === '') setErrorCaptcha('Captcha is invalid');
        else setErrorCaptcha('');
    }

    const ValidationFullName = async () => {
        if (getActiveValidation && getValueFullName === '') setErrorFullName('Full Name can not be empty')
        else setErrorFullName('');
    }

    const ValidationEmail = async () => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (getActiveValidation && getValueEmail === '') setErrorEmail('Email can not be empty')
        else if (getActiveValidation && !getValueEmail.match(regex)) setErrorEmail('Email is invalid')
        else setErrorEmail('');
    }

    const ValidationPhone = async () => {
        if (getActiveValidation && getValuePhone === '') setErrorPhone('Phone number can not be empty')
        else setErrorPhone('');
    }

    return (
        <div className={style.container}>
            <div className={cx(style.card, global.p_24)}>
                <div className={style.toggle} onClick={close}>x</div>
                {getFollowingUp ?
                    <React.Fragment>
                        <p className={style.title}>Thank you, we will contact you back</p>
                        <Image src={IconCheck} width={96} height={96} alt="Icon Check" />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p className={style.title}>FOLLOW UP</p>
                        <div className={cx(global.input_group, global.column)}>
                            <p className={global.title}>Full Name</p>
                            <input type="text" value={getValueFullName} onInput={InputFormatAlphabet} onChange={e => setValueFullName(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorFullName}</div>
                        </div>
                        <div className={cx(global.input_group, global.column)}>
                            <p className={global.title}>Email Address</p>
                            <input type="email" value={getValueEmail} onChange={e => setValueEmail(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorEmail}</div>
                        </div>
                        <div className={cx(global.input_group, global.column)}>
                            <p className={global.title}>Phone</p>
                            <div className={global.input_phone}>
                                <select value={getValueCountryPhone} onChange={e => setValueCountryPhone(e.target.value)}>
                                    <option value="+62">+62</option>
                                </select>
                                <input type="text" className={global.unset} value={getValuePhone} onInput={InputFormatNumber} onChange={e => setValuePhone(e.target.value)} required={true} />
                            </div>
                            <div className={global.error}>{getErrorPhone}</div>
                        </div>
                        <div className={cx(global.input_group, global.column)}>
                            <p className={global.title}>Organization Name</p>
                            <input type="text" value={getValueOrganizationName} onInput={InputFormatAlphabet} onChange={e => setValueOrganizationName(e.target.value)} />
                        </div>
                        <ReCAPTCHA sitekey='6LcWhFchAAAAALfnW6Yxxs5KrF0QKhXI-IH8jEgl' onChange={e => setValueCaptcha(e)} />
                            <div className={global.error}>{getErrorCaptcha}</div>
                        <button type='button' className={global.button} onClick={FollowUp}>Follow Up</button>
                    </React.Fragment>
                }
            </div>
        </div >
    )
}
