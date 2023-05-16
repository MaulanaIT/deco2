// Import Library
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


// Import Custom Library
import { CheckInputValid, cx, InputFormatNumber } from '../../components/Helper';
import { HideLoading, ShowLoading, ShowPopupResponse } from '../../components/store/reducer';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/register.module.css';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
export default function Index() {

    const [getDisabledButton, setDisabledButton] = useState(false);

    const [getValueFullName, setValueFullName] = useState('');
    const [getValueEmail, setValueEmail] = useState('');
    const [getValuePhone, setValuePhone] = useState('');
    const [getValuePassword, setValuePassword] = useState('');
    const [getValueConfirmPassword, setValueConfirmPassword] = useState('');
    const [getValueOrganizationName, setValueOrganizationName] = useState('');

    const [getErrorFullName, setErrorFullName] = useState('');
    const [getErrorEmail, setErrorEmail] = useState('');
    const [getErrorPhone, setErrorPhone] = useState('');
    const [getErrorPassword, setErrorPassword] = useState('');
    const [getErrorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [getActiveValidation, setActiveValidation] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        ValidationEmail();
    }, [getValueEmail]);

    useEffect(() => {
        ValidationFullName();
    }, [getValueFullName]);

    useEffect(() => {
        ValidationPassword();
    }, [getValuePassword, getValueConfirmPassword]);

    useEffect(() => {
        ValidationConfirmPassword();
    }, [getValuePassword, getValueConfirmPassword]);

    useEffect(() => {
        ValidationPhone();
    }, [getValuePhone]);

    useEffect(() => {
        setActiveValidation(true);
    }, []);

    const Register = async () => {
        await ValidationFullName();
        await ValidationEmail();
        await ValidationPhone();
        await ValidationPassword();
        await ValidationConfirmPassword();

        if (CheckInputValid()) {
            dispatch(ShowLoading());
            setDisabledButton(true);

            const formData = new FormData();

            formData.append('member_fullname', getValueFullName);
            formData.append('member_email', getValueEmail);
            formData.append('member_password', getValuePassword);
            formData.append('member_country_phone', getValuePhone.split(' ')[0]);
            formData.append('member_phone', getValuePhone.replace(/\s/g, ''));
            formData.append('member_company_name', getValueOrganizationName);

            axios.post(`${process.env.baseURL}/api/microsite/sign_up`, formData, process.env.config).then(response => {
                dispatch(ShowPopupResponse({ text: response.data.message }));

                router.push('/login');

                setDisabledButton(false);
            }).catch(error => {
                console.log(error);

                setDisabledButton(false);
                dispatch(HideLoading());
            });
        }
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

    const ValidationPassword = async () => {
        if (getActiveValidation && getValuePassword === '') setErrorPassword('Password can not be empty')
        else if (getActiveValidation && getValuePassword.length < 6) setErrorPassword('Password must have minimum 6 character')
        else setErrorPassword('');
    }

    const ValidationConfirmPassword = async () => {
        if (getActiveValidation && getValueConfirmPassword === '') setErrorConfirmPassword('Confirm password can not be empty')
        else if (getActiveValidation && getValueConfirmPassword !== getValuePassword) setErrorConfirmPassword('Password not match')
        else setErrorConfirmPassword('');
    }

    const ValidationPhone = async () => {
        if (getActiveValidation && getValuePhone === '') setErrorPhone('Phone number can not be empty')
        else setErrorPhone('');
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <p className={cx(style.title, global.mb_12)}>Sign Up</p>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>FullName</p>
                    <input type="text" placeholder={`FullName . . .`} value={getValueFullName} onChange={e => setValueFullName(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorFullName}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Email</p>
                    <input type="text" placeholder={`Email . . .`} value={getValueEmail} onChange={e => setValueEmail(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorEmail}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Phone</p>
                    <div className={global.input_phone}>
                        <PhoneInput country={`id`} value={getValuePhone} inputProps={{ required: true }} onChange={(phone, country, e, data) => {
                            setValuePhone(data);
                        }} />
                    </div>
                    <div className={global.error}>{getErrorPhone}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Password</p>
                    <input type="password" placeholder={`Password . . .`} value={getValuePassword} min={6} onChange={e => setValuePassword(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorPassword}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Confirm Password</p>
                    <input type="password" placeholder={`Confirm Password . . .`} value={getValueConfirmPassword} onChange={e => setValueConfirmPassword(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorConfirmPassword}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Organization Name</p>
                    <input type="text" placeholder={`Organization Name . . .`} value={getValueOrganizationName} onChange={e => setValueOrganizationName(e.target.value)} />
                </div>
                <p className={cx(global.error, global.mb_12)}></p>
                <p className={style.note}>Already have an account? <Link href={'/login'}><span className={style.login}>Sign In</span></Link></p>
                <button type='button' className={style.login} onClick={Register} disabled={getDisabledButton}>Sign Up</button>
            </div>
        </div>
    )
}